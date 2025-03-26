import os
import shutil
import re
from pathlib import Path
from datetime import datetime

def find_all_image_references(directory='.'):
    # Regex pattern for image references
    image_pattern = r'(?i)["\']([^"\']*\.(?:jpg|jpeg|png|gif|svg|ico|webp)(?:\?[^"\']*)?)["\']'
    
    # Store results with full paths and filenames
    referenced_paths = set()
    referenced_files = set()
    
    # Walk through directory
    for root, _, files in os.walk(directory):
        # Skip node_modules and backup directories
        if any(x in root.split(os.sep) for x in ['node_modules', 'backup_unused']):
            continue
            
        for file in files:
            if file.endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.webp')):
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

def delete_unreferenced_assets(dry_run=True):
    # Only check docs/images/logos
    image_dirs = [
        'docs/images/logos',
    ]
    
    # Get referenced images
    referenced_paths, referenced_files = find_all_image_references()
    
    # Track unreferenced files
    unreferenced = []
    
    # Check each directory
    for dir_path in image_dirs:
        if not os.path.exists(dir_path):
            print(f"\nDirectory not found: {dir_path}")
            return
            
        for file in os.listdir(dir_path):
            if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif', '.svg', '.ico', '.webp', '.pdf')):
                file_path = os.path.join(dir_path, file)
                relative_path = file_path.replace('\\', '/')  # Normalize path separators
                
                # Check both full path and filename
                if relative_path not in referenced_paths and file not in referenced_files:
                    unreferenced.append(file_path)
    
    if not unreferenced:
        print("\nNo unreferenced images found in docs/images/logos.")
        return
    
    # Sort for consistent output
    unreferenced.sort()
    
    # Show what will be deleted
    print("\nUnreferenced logos that will be deleted from docs/images/logos:")
    print("--------------------------------------------------------")
    for path in unreferenced:
        print(f"- {os.path.basename(path)}")
    
    if dry_run:
        print("\nDRY RUN - No files were deleted")
        print("To delete files, run with: python delete_unused_assets.py --delete")
        return
    
    # Confirm before deletion
    print(f"\nAbout to delete {len(unreferenced)} files from docs/images/logos")
    response = input("Are you sure you want to proceed? (yes/no): ")
    
    if response.lower() != 'yes':
        print("Deletion cancelled.")
        return
    
    # Create timestamped backup directory
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    backup_dir = f'backup_logos_{timestamp}'
    os.makedirs(backup_dir)
    
    # Delete files (with backup)
    print("\nDeleting files...")
    for file_path in unreferenced:
        # Preserve directory structure in backup
        rel_path = os.path.relpath(file_path)
        backup_path = os.path.join(backup_dir, rel_path)
        
        # Create necessary directories in backup
        os.makedirs(os.path.dirname(backup_path), exist_ok=True)
        
        # First backup the file
        shutil.copy2(file_path, backup_path)
        
        # Then delete original
        os.remove(file_path)
        print(f"Deleted: {rel_path}")
    
    print(f"\nDeleted {len(unreferenced)} files")
    print(f"Backup copies saved in: {backup_dir}")

if __name__ == "__main__":
    import sys
    
    # Check for --delete flag
    dry_run = '--delete' not in sys.argv
    delete_unreferenced_assets(dry_run) 