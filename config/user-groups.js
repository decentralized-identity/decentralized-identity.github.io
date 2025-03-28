module.exports = {
  activeUserGroups: {
    "didcomm": {
      name: "DIDComm",
      logo: "didcomm",
      subtitle: "User Group",
      shortform: null,
      status: "active",
      url: "/user-groups/didcomm",
      scope: "The DIDComm User Group focuses on implementation experiences, challenges, and best practices around DIDComm messaging protocol. This group provides a forum for developers and implementers to share knowledge, discuss practical issues, and collaborate on DIDComm-based solutions.",
      type: "open",
      meeting: {
        schedule: "Monthly meetings",
        calendar: "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=..."  // Add actual calendar link
      },
      charters: {
        "DIDComm User Group documentation": {
          links: [
            {
              text: "GitHub Repository",
              href: "https://github.com/decentralized-identity/didcomm-usergroup"
            }
          ]
        }
      },
      chairs: {
        "Colton Wolkins": {
          title: "Senior Backend Software Engineer @ Indicio",
          photo: "/images/photos/colton-wolkins.jpeg",
          linkedin: "colton-wolkins"
        }
      }
    },

    "veramo": {
      name: "Veramo",
      logo: "veramo",
      subtitle: "User Group",
      shortform: null,
      status: "active",
      url: "/user-groups/veramo",
      scope: "The Veramo User Group is dedicated to supporting developers and organizations implementing Veramo, sharing implementation experiences, best practices, and fostering collaboration among Veramo users.",
      type: "open",
      meeting: {
        schedule: "Monthly meetings",
        calendar: "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=..."  // Add actual calendar link
      },
      charters: {
        "Veramo User Group documentation": {
          links: [
            {
              text: "GitHub Repository",
              href: "https://github.com/decentralized-identity/veramo-usergroup"
            }
          ]
        }
      },
      chairs: {
        "Mircea Nistor": {
          photo: "/images/photos/mircea-nistor.png",
          linkedin: "mirceanis",
          twitter: "mirceanistor"
        },
        "Nick Reynolds": {
          photo: "/images/photos/nick-reynolds.png",
          linkedin: "reynoldsnick"
        }
      }
    }
  },

  archivedUserGroups: {
    // For any future archived user groups
  }
}; 