import os
import shutil
import re
from pathlib import Path
from datetime import datetime

def find_all_image_references(directory='.'):
    # Regex pattern for image references
    image_pattern = r'(?i)["\']([^"\']*\.(?:jpg|jpeg|png|gif|svg|ico|webp|pdf)(?:\?[^"\']*)?)["\']'
    
    # Store results with full paths and filenames
    referenced_paths = set()
    referenced_files = set()
    
    # Walk through directory
    for root, _, files in os.walk(directory):
        # Skip node_modules, backup directories, and unused directory
        if any(x in root.split(os.sep) for x in ['node_modules', 'backup_unused', 'unused']):
            continue
            
        for file in files:
            if file.endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.webp', '.pdf')):
                continue
                
            file_path = os.path.join(root, file)
            
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                matches = re.finditer(image_pattern, content)
                
                for match in matches:
                    image_ref = match.group(1)
                    if not image_ref.startswith('data:'):
                        # Store both full path and filename
                        referenced_paths.add(image_ref.lstrip('/'))
                        referenced_files.add(os.path.basename(image_ref))
                        
            except UnicodeDecodeError:
                continue
    
    return referenced_paths, referenced_files

def move_unreferenced_assets(dry_run=True):
    root_dirs = [
        'docs/',
    ]
    
    # Get referenced images
    referenced_paths, referenced_files = find_all_image_references()
    
    # Track unreferenced files
    unreferenced = []
    
    # Recursively check each directory
    for root_dir in root_dirs:
        for root, dirs, files in os.walk(root_dir):
            # Skip unused directory
            if 'unused' in root:
                continue
                
            for file in files:
                if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.webp', '.pdf')):
                    file_path = os.path.join(root, file)
                    relative_path = file_path.replace('\\', '/')  # Normalize path separators
                    
                    # Check both full path and filename
                    if relative_path not in referenced_paths and file not in referenced_files:
                        unreferenced.append(file_path)
    
    if not unreferenced:
        print("\nNo unreferenced images found.")
        return
    
    # Sort for consistent output
    unreferenced.sort()
    
    # Group by directory for clearer output
    print("\nUnreferenced assets that will be moved to 'unused' directory:")
    print("-----------------------------------------------------")
    current_dir = None
    for path in unreferenced:
        dir_name = os.path.dirname(path)
        if dir_name != current_dir:
            print(f"\nIn {dir_name}:")
            current_dir = dir_name
        print(f"- {os.path.basename(path)}")
    
    if dry_run:
        print(f"\nDRY RUN - Found {len(unreferenced)} unreferenced files")
        print("To move files, run with: python scripts/delete_unused_assets.py --move")
        return
    
    # Confirm before moving
    print(f"\nAbout to move {len(unreferenced)} files to 'unused' directory")
    response = input("Are you sure you want to proceed? (yes/no): ")
    
    if response.lower() != 'yes':
        print("Operation cancelled.")
        return
    
    # Create unused directory with timestamp
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    unused_dir = f'unused_{timestamp}'
    os.makedirs(unused_dir, exist_ok=True)
    
    # Move files
    print("\nMoving files...")
    for file_path in unreferenced:
        # Preserve directory structure
        rel_path = os.path.relpath(file_path)
        new_path = os.path.join(unused_dir, rel_path)
        
        # Create necessary directories
        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        
        # Move the file
        shutil.move(file_path, new_path)
        print(f"Moved: {rel_path}")
    
    print(f"\nMoved {len(unreferenced)} files")
    print(f"Files are now in: {unused_dir}")

if __name__ == "__main__":
    import sys
    
    # Check for --move flag instead of --delete
    dry_run = '--move' not in sys.argv
    move_unreferenced_assets(dry_run) 