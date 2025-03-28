module.exports = {
  activeUserGroups: {
    "didcomm": {
      name: "DIDComm",
      logo: "didcomm",
      shortform: null,
      status: "active",
      url: "/user-groups/didcomm",
      scope: "The DIDComm User Group is tasked with serving community needs around DIDComm that fall outside DIDComm spec creation concerns. This is an open, public, non-IPR group",
      type: "ug",
      repoTag: "didcomm",
      meetingSchedule: [
        {
          key: "",
          value: "test"
        },
      ],
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
      shortform: null,
      status: "active",
      repoTag: "veramo",
      url: "/user-groups/veramo",
      scope: "The Veramo User Group is tasked with developing Veramo and serving its community needs. This is an open, non-IPR group.",
      type: "ug",
      meetingSchedule: [
        {
          key: "",
          value: "test"
        },
      ],
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