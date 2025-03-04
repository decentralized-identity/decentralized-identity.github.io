module.exports = {
  authentication: {
    name: "Authentication",
    logo: "login_screen",
    title: "Authentication Working Group",
    shortform: "DID Auth WG",
    type: "Working Group",
    repoTag: "wg-auth",
    scope: "Since December 2020, this work is hosted by the Open Identity Foundation. This group to contribute to standards and technology that designs and implements authentication protocols that rely upon open standards and cryptographic protocols, including DIDs and DID Documents. This group develops specifications, protocols, and formats for data structures used for authentication.",
    charters: {
      "DIDAuth WG documentation": {
        links: [
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_DIDAuth_WG_charter_v1.pdf"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/didauth-wg"
          },
          {
            text: "Slack channel (members only)",
            href: "https://difdn.slack.com/archives/C7TFEG9B6"
          },
          {
            text: "WG participants",
            href: "https://github.com/decentralized-identity?q=wg-auth&type=&language=&sort="
          },
          {
            text: "WG GitHub Repos",
            href: "https://github.com/decentralized-identity?q=wg-id&type=&language="
          },
          {
            text: "WG Meeting Recordings",
            href: "https://docs.google.com/spreadsheets/d/1wgccmMvIImx30qVE9GhRKWWv3vmL2ZyUauuKx3IfRmA/edit?gid=2130393558#gid=2130393558"
          }
        ]
      }
    },
    projects: {
      "DID Authentication Profile for SIOP": {
        desc: "This specification defines the SIOP DID AuthN flavor to use OpenID Connect (OIDC) together with the strong decentralization, privacy and security guarantees of DID for everyone who wants to have a generic way to integrate SSI wallets into their web applications.",
        links: [
          {
            text: "OIDF - SIOP v2 (draft)",
            href: "https://openid.net/specs/openid-connect-self-issued-v2-1_0.html"
          },  
          {
            text: "OIDF - SIOP v2 (most recent editor's draft )",
            href: "https://openid.bitbucket.io/connect/openid-connect-self-issued-v2-1_0.html"
          },  
          {
            text: "Explainer - outdated. New work carried out under OIDF",
            href: "https://github.com/decentralized-identity/papers/blob/master/did-authn/siop/did-authn-siop-profile.md"
          },
          {
            text: "Repo - outdated. New work carried out under OIDF",
            href: "https://github.com/decentralized-identity/did-siop"
          }
        ]
      },
      "DIDComm JS Lib": {
        desc: "A shared effort with the HL Aries project to create a standardized means of authenticated general message passing between DID controllers. More information will be added soon.",
        links: [
          {
            text: "Repo",
            href: "https://github.com/decentralized-identity/DIDComm-js"
          }
        ]
      }
    },
    chairs: {
      "Oliver Terbu": {
        title: "Identity Architect @ Spruce",
        photo: "/images/photos/oliver-terbu.jpg",
        linkedin: "oliver-terbu",
        twitter: "OliverTerbu"
      }
    },
    liaison: {
      "Kristina Yasuda": {
        title: "OIDC liaison / Microsoft",
        photo: "/images/photos/kristina_yasuda.jpg",
        linkedin: "kristina-yasuda-6263b5a2",
        twitter: "kristinayasuda"
      }
    }
  },
  "claims-credentials": {
    name: "Claims and Credentials",
    logo: "validate_user",
    title: "Claims and Credentials Working Group",
    shortform: "CC WG",
    repoTag: "wg-cc",
    scope: "Join this group to contribute to the standards and technology that create, exchange, and verify claims and credentials in a decentralized identity ecosystem. For example, a cryptographically verifiable credential that proves an individual has a college degree or is of a certain age. Our members focus on specs that are vendor agnostic and based on industry standards.",
    charters: {
      "Claims and Credentials WG documentation": {
        links: [
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_CC_WG_charter_v1.pdf"
          },
          {
            text: "Agenda/GitHub",
            href: "https://github.com/decentralized-identity/claims-credentials/blob/main/AGENDA.md"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/cc-wg"
          },
          {
            text: "Slack channel (members only)",
            href: "https://difdn.slack.com/archives/C4X50SNUX"
          },
          {
            text: "Calendar entry",
            href: "https://calendar.google.com/event?action=TEMPLATE&tmeid=NDUzZGpxcHE4ZjhtNDI0azdwMTFpOWVzOGlfMjAyNTAyMTFUMTgwMDAwWiBkZWNlbnRyYWxpemVkLmlkZW50aXR5QG0=&tmsrc=decentralized.identity%40gmail.com&scp=ALLL"
          },
          {
            text: "WG participants",
            href: "https://docs.google.com/spreadsheets/d/12hFa574v5PRrKfzIKMgDTjxuU6lvtBhrmLspfKkN4oE/edit#gid=1727803158"
          },
          {
            text: "WG GitHub Repos",
            href: "https://github.com/decentralized-identity?q=wg-cc&type=&language=&sort="
          },
          {
            text: "WG Meeting Recordings",
            href: "https://docs.google.com/spreadsheets/d/1wgccmMvIImx30qVE9GhRKWWv3vmL2ZyUauuKx3IfRmA/edit?gid=1252135265#gid=1252135265"
          }
        ]
      }
    },
    projects: {
      "WACI-DIDComm": {
        desc: "WACI-DIDComm is an initiative to create a common stack for wallet and credential interactions leveraging features of DIDComm V2 messaging protocol (along with Aries Present Proof message formats and DIF Presentation Exchange data objects).",
        links: [
          {
            text: "Specification",
            type: "doc",
            href: "https://identity.foundation/waci-didcomm"
          },
          {
            text: "Repo",
            href: "https://github.com/decentralized-identity/waci-didcomm"
          }
        ]
      },
      "Credential Manifest": {
        desc: "The DID Credential Manifest is a format that aims to normalize the process of credential acquisition, wherein the issuer is able to describe the requirements the subject or participant in the credential generation process must meet for the issuer to generate the desired credential.",
        links: [
          {
            text: "Specification",
            type: "doc",
            href: "https://identity.foundation/credential-manifest"
          },
          {
            text: "Repo",
            href: "https://github.com/decentralized-identity/credential-manifest"
          }
        ]
      },
      "VC JSON Schemas": {
        desc: "The VC JSON Schema specification aims to provide a standardized mechanism to use JSON Schemas as the data backing for Verifiable Credentials. Though the repository lives in the W3C-CCG, this working group contains key contributors and has a vested interest in contributing to the development of the specification.",
        links: [
          {
            text: "Specification",
            type: "doc",
            href: "https://w3c-ccg.github.io/vc-json-schemas/"
          },
          {
            text: "Repo",
            href: "https://github.com/w3c-ccg/vc-json-schemas"
          }
        ]
      }
    },
    chairs: {
      "Valerio Massimo Camaiani": {
        title: "SWE at Crossmint",
        photo: "/images/photos/valerio-camaiani.jpeg",
        linkedin: "vmcvastry"
      },
      "Otto Mora": {
        title: "Growth Team, Privado ID",
        photo: "/images/photos/otto-mora.jpg",
        linkedin: "otto-mora",
        twitter: "ottomorac"
      }
    }
  },
  "did-methods": {
    name: "DID Methods",
    logo: "blueprint",
    title: "DID Methods Working Group",
    shortform: "DID Methods WG",
    repoTag: "wg-dm",
    scope: "Members of this Working Group are creating specifications to standardize an initial set of commonly used DID methods and develop strategies for collaborative, scalable, self-help standardization of DID methods more broadly.",
    charters: {
      "DID Methods WG documentation": {
        links: [
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/main/Org%20documents/WG%20documents/DIF_DID_Methods_WG_Charter_v1.pdf"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/did-methods-wg"
          },
          {
            text: "Calendar entry",
            href: "https://calendar.google.com/event?action=TEMPLATE&tmeid=dTRpa3JmNThiZGczc2FzZHQ0bnFsdGRjcGxfMjAyNTAxMTVUMTcwMDAwWiBkZWNlbnRyYWxpemVkLmlkZW50aXR5QG0=&tmsrc=decentralized.identity%40gmail.com&scp=ALL"
          },
          {
            text: "WG participants",
            href: "https://github.com/decentralized-identity?q=wg-dm&type=&language=&sort="
          },
          {
            text: "WG Meeting Recordings",
            href: "https://docs.google.com/spreadsheets/d/1wgccmMvIImx30qVE9GhRKWWv3vmL2ZyUauuKx3IfRmA/edit?gid=242845701#gid=242845701"
          }
        ]
      }
    },
    chairs: {
      "Matt McKinney": {
        title: "Growth @ ArcBlock",
        photo: "/images/photos/matt-mckinney.jpeg",
        linkedin: "mtmckinney",
        twitter: "RobRoyHobbs"
      },
      "Jonathan Rayback": {
        title: "Owner @ Future Forge Innovation",
        photo: "/images/photos/jonathan-rayback.jpg",
        linkedin: "jonathan-rayback"
      },
      "Markus Sabadello": {
        title: "Founder @ Danube Tech",
        photo: "/images/photos/markus-sabadello.jpg",
        linkedin: "markus-sabadello-353a0821",
        twitter: "peacekeeper"
      }
    }
  },
  "creator-assertions": {
    name: "Creator Assertions",
    logo: "signature",
    title: "Creator Assertions Working Group",
    shortform: "CAWG",
    repoTag: "wg-ca",
    scope: "The Creator Assertions Working Group builds upon the work of the Coalition for Content Provenance and Authenticity (C2PA) by defining additional assertions that allow content creators to express individual and organizational intent about their content.",
    charters: {
      "Creator Assertions WG documentation": {
        links: [
          {
            text: "Group Home",
            href: "https://cawg.io/"
          },
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/main/Org%20documents/WG%20documents/DIF_CAWG_WG_charter_v1.pdf"
          },
          {
            text: "WG Operating Addendum",
            href: "https://github.com/decentralized-identity/org/blob/main/Org%20documents/WG%20documents/DIF_CAWG_WG_Operating_Addendum_v1.pdf"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/cawg"
          },
          {
            text: "Calendar entry",
            href: "https://calendar.google.com/event?action=TEMPLATE&tmeid=dTRpa3JmNThiZGczc2FzZHQ0bnFsdGRjcGxfMjAyNTAxMTVUMTcwMDAwWiBkZWNlbnRyYWxpemVkLmlkZW50aXR5QG0=&tmsrc=decentralized.identity%40gmail.com&scp=ALL"
          }
        ]
      }
    },
    chairs: {
      "Eric Scouten": {
        title: "Identity Standards Architect, Content Authenticity Initiative @ Adobe",
        photo: "/images/photos/eric-scouten.jpg",
        linkedin: "ericscouten",
        bluesky: "https://bsky.app/profile/ericscouten.me"
      }
    }
  },
  "did-comm": {
    name: "DIDComm",
    logo: "communicate_user",
    title: "DIDComm Working Group",
    shortform: "DIDcomm",
    repoTag: "wg-didcomm",
    scope: "Join this group to contribute to specs that embody a method for secure, private and authenticated message-based communication, where trust is rooted in DIDs and used over a wide variety of transports.",
    charters: {
      "DIDcomm WG documentation": {
        links: [
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_DIDcomm_WG_Charter_v1.pdf"
          },
          {
            text: "WG Operating Addendum",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_DIDcomm_WG_Operating_Addendum_v1.pdf"
          },
          {
            text: "DIDComm Homepage",
            href: "https://didcomm.org"
          },
          {
            text: "DIDComm Book",
            href: "https://book.didcomm.org"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/didcomm-wg"
          },
          {
            text: "DIDComm User Group Resources",
            href: "https://identity.foundation/didcomm-usergroup/"
          },
          {
            text: "Calendar entry",
            href: "https://calendar.google.com/event?action=TEMPLATE&tmeid=amwwN242aWljN2dqa21pZmJyM3NuZjYyMHVfMjAyNTAyMDNUMjAwMDAwWiBkZWNlbnRyYWxpemVkLmlkZW50aXR5QG0=&tmsrc=decentralized.identity%40gmail.com&scp=ALL"
          },
          {
            text: "WG Meeting Recordings",
            href: "https://docs.google.com/spreadsheets/d/1wgccmMvIImx30qVE9GhRKWWv3vmL2ZyUauuKx3IfRmA/edit?gid=429611178#gid=429611178"
          }
        ]
      }
    },
    chairs: {
      "Sam Curren": {
        title: "Technology Guy",
        photo: "/images/photos/sam-curren.jpg",
        linkedin: "samcurren",
        twitter: "telegramsam"
      },
      "Steve McCown": {
        title: "Chief Architect @ Anonyome Labs",
        photo: "/images/photos/steve-mccown.jpeg",
        linkedin: "mccown"
      }
    }
  },
  "identifiers-discovery": {
    name: "Identifiers & Discovery",
    logo: "user_graph",
    title: "Identifiers and Discovery Working Group",
    shortform: "ID WG",
    repoTag: "wg-id",
    scope: "Members of the Working Group are engaged in development of protocols and systems that enable creation, resolution, and discovery of decentralized identifiers and names across underlying decentralized systems, like blockchains and distributed ledgers.",
    charters: {
      "Identifiers and Discovery WG documentation": {
        links: [
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_ID_WG_charter_v1.pdf"
          },
          {
            text: "Agenda/GitHub",
            href: "https://github.com/decentralized-identity/identifiers-discovery/"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/id-wg"
          },
          {
            text: "Slack channel (members only)",
            href: "https://difdn.slack.com/messages/C4WED8JSH"
          },
          {
            text: "Calendar entry - bi-weekly meeting",
            href: "https://calendar.google.com/event?action=TEMPLATE&tmeid=NWwzYmI3Y2c0aG9qdmt1Z2kxYzRtM2hsbjNfMjAyNTAxMjdUMTkwMDAwWiBkZWNlbnRyYWxpemVkLmlkZW50aXR5QG0=&tmsrc=decentralized.identity%40gmail.com&scp=ALL"
          },
          {
            text: "WG participants",
            href: "https://docs.google.com/spreadsheets/d/12hFa574v5PRrKfzIKMgDTjxuU6lvtBhrmLspfKkN4oE/edit#gid=0"
          }
        ]
      }
    },
    projects: {
      "Universal Resolver": {
        desc: "Specification and implementation of a driver-based framework that enables resolution of DIDs.",
        links: [
          {
            text: "Main Repo",
            href: "https://github.com/decentralized-identity/universal-resolver"
          },
          {
            text: "Public Instance",
            type: "app",
            href: "https://uniresolver.io/"
          },
          {
            text: "Driver Development",
            href: "https://github.com/decentralized-identity/universal-resolver/blob/master/docs/driver-development.md"
          }
        ]
      },
      "Universal Registrar": {
        desc: "Specification and implementation of a driver-based framework that enables creation/updates/deactivation of DIDs.",
        links: [
          {
            text: "Main Repo",
            href: "https://github.com/decentralized-identity/universal-registrar"
          },
          {
            text: "Public Instance",
            type: "app",
            href: "https://uniregistrar.io/"
          },
          {
            text: "Driver Development",
            href: "https://github.com/decentralized-identity/universal-registrar/blob/master/docs/driver-development.md"
          }
        ]
      },
      ".well-known DID configuration": {
        desc: "Specification, docs, and implementations for discovering DIDs from .well-known HTTP(S) URIs.",
        links: [
          {
            text: "Specification",
            type: "doc",
            href: "https://identity.foundation/specs/did-configuration/"
          },
          {
            text: "Main Repo",
            href: "https://github.com/decentralized-identity/.well-known/"
          },
          {
            text: "Demo Web App",
            type: "app",
            href: "https://identity.foundation/.well-known/resources/did-configuration/demo/build/index.html"
          }
        ]
      },
      "Peer DID Method Specification": {
        desc: "A rich DID method that has no blockchain dependencies. The verifiable data registry is a synchronization protocol between peers.",
        links: [
          {
            text: "Specification",
            type: "doc",
            href: "https://identity.foundation/peer-did-method-spec/"
          },
          {
            text: "Main Repo",
            href: "https://github.com/decentralized-identity/peer-did-method-spec"
          }
        ]
      },
      "DID Specification Extensions": {
        desc: " Extension parameters, properties, and values for the DID spec registries.",
        links: [
          {
            text: "Main Repo",
            href: "https://github.com/decentralized-identity/did-spec-extensions"
          }
        ]
      },
      "did:webvh": {
        desc: "did:webvh DID Method.",
        links: [
          {
            text: "Specification",
            type: "doc",
            href: "https://identity.foundation/didwebvh/"
          },
          {
            text: "Main Repo",
            href: "https://github.com/decentralized-identity/didwebvh"
          }
        ]
      },
      "Linked Verifiable Presentation": {
        desc: "Specification for linking Verifiable Presentations in DID documents.",
        links: [
          {
            text: "Specification",
            type: "doc",
            href: "https://identity.foundation/linked-vp"
          },
          {
            text: "Main Repo",
            href: "https://github.com/decentralized-identity/linked-vp"
          }
        ]
      },
      "DID Traits": {
        desc: "Specification for representing DID method traits in a structured, machine-readable format.",
        links: [
          {
            text: "Specification",
            type: "doc",
            href: "https://identity.foundation/did-traits"
          },
          {
            text: "Main Repo",
            href: "https://github.com/decentralized-identity/did-traits"
          }
        ]
      }
    },
    chairs: {
      "Markus Sabadello": {
        title: "Founder @ Danube Tech",
        photo: "/images/photos/markus-sabadello.jpg",
        linkedin: "markus-sabadello-353a0821",
        twitter: "peacekeeper"
      },
      "Jan Christoph Ebersbach": {
        title: "Founder @ identinet",
        photo: "/images/photos/Jan-Christoph-Ebersbach-cropped.jpg",
        linkedin: "JCEbersbach",
        twitter: "JCEbersbach"
      }
    }
  },
  "secure-data-storage": {
    name: "Secure Data Storage",
    logo: "box",
    title: "Secure Data Storage Working Group",
    shortform: "SDS WG",
    repoTag: "wg-sds",
    scope: "Create one or more specifications to establish a foundational layer for secure data storage (including personal data), specifically data models for storage and transport, syntax, data at rest protection, CRUD API, access control, synchronization, and at least a minimum viable HTTP-based interface compatible with W3C DIDs/VCs.",
    charters: {
      "SDS WG documentation": {
        links: [
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_SDS_WG_charter_v1.pdf"
          },
          {
            text: "Operating Addendum",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_SDS_WG_Operating_Addendum_v1.pdf"
          },
          {
            text: "Agenda/GitHub",
            href: "https://github.com/decentralized-identity/confidential-storage/blob/master/agenda.md"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/sds-wg/"
          },
          {
            text: "WG GitHub Repos",
            href: "https://github.com/decentralized-identity?q=wg-sds&type=&language=&sort="
          }
        ]
      }
    },
    projects: {
      "Decentralized Web Node": {
        desc: "A Decentralized Web Node (DWN) is a data storage and message relay mechanism entities can use to locate public or private permissioned data related to a given Decentralized Identifier (DID).",
        links: [
          {
            text: "Specification",
            type: "doc",
            href: "https://identity.foundation/decentralized-web-node/spec/"
          },
          {
            text: "Repo",
            href: "https://github.com/decentralized-identity/decentralized-web-node"
          }
        ]
      },
      "Encrypted Data Vaults (Archived)": {
        desc: "This specification describes a privacy-respecting mechanism for storing, indexing, and retrieving encrypted data at a storage provider. It is often useful when an individual or organization wants to protect data in a way that the storage provider cannot view, analyze, aggregate, or resell the data. This approach also ensures that application data is portable and protected from storage provider data breaches.",
        links: [
          {
            text: "Specification",
            type: "doc",
            href: "https://identity.foundation/edv-spec/"
          },
          {
            text: "Repo",
            href: "https://github.com/decentralized-identity/edv-spec/"
          }
        ]
      }
    },
    chairs: {
      "Andor Kesselman": {
        title: "Co-Founder and CTO @ Benri ",
        photo: "/images/photos/andor-kesselman.jpg",
        linkedin: "andorsk"
      }
    }
  },
  sidetree: {
    name: "Sidetree",
    logo: "sidetree",
    title: "Sidetree Development & Operating Group",
    subtitle: "Development & Operating Group",
    shortform: "Sidetree",
    repoTag: "wg-sidetree",
    scope: "The development and maintenance of the formal Sidetree specification, and a hub of coordination for Sidetree-based DID Method node operators. This group also generates libraries, tooling, and documentation to aid Sidetree-based DID Method node operators.",
    charters: {
      "Sidetree Development & Operating Group documentation": {
        links: [
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_Sidetree_WG_charter_v1.pdf"
          },
          {
            text: "Agenda/GitHub",
            href: "https://github.com/decentralized-identity/sidetree/blob/master/agenda.md"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/sidetree-wg"
          },
          {
            text: "Slack channel (members only)",
            href: "https://difdn.slack.com/archives/CTACA7EDU"
          },
          {
            text: "WG GitHub Repos",
            href: "https://github.com/decentralized-identity?q=+wg-sidetree&type=&language=&sort="
          }
        ]
      }
    },
    projects: {
      "Sidetree Protocol": {
        desc: "Specification, docs, and implementations for the chain/ledger-agnostic DID scaling protocol.",
        links: [
          {
            text: "Main Repo",
            href: "https://github.com/decentralized-identity/sidetree-core"
          },
          {
            text: "Specification",
            type: "doc",
            href: "https://identity.foundation/sidetree/spec/"
          }
        ]
      },
      "ION": {
        desc: "An implementation of the Sidetree protocol atop the Bitcoin blockchain.",
        links: [
          {
            text: "Main Repo",
            href: "https://github.com/decentralized-identity/ion"
          },
          {
            text: "Install Guide",
            href: "https://github.com/decentralized-identity/ion/blob/master/install-guide.md"
          }
        ]
      },
      "Element": {
        desc: "An implementation of the Sidetree protocol using the Ethereum blockchain.",
        links: [
          {
            text: "Main Repo",
            href: "https://github.com/decentralized-identity/element"
          },
          {
            text: "Demo Wallet & Explorer",
            type: "app",
            href: "https://element-did.com/"
          }
        ]
      }
    },
    chairs: {
      "Daniel Buchner": {
        title: "Head of Decentralized Identity @ Block",
        photo: "/images/photos/daniel-buchner.jpg",
        linkedin: "dbuchner",
        twitter: "csuwildcat"
      },
      "Troy Ronda ": {
        title: "Chief Scientist @ Securekey",
        photo: "/images/photos/troy-ronda.jpg",
        linkedin: "troyronda",
        twitter: "troyronda"
      }
    }
  },
  "wallet-security": {
    name: "Wallet Security",
    logo: "wallet",
    title: "Wallet Security Working Group",
    shortform: "WS WG",
    repoTag: "wg-ws",
    scope: "Define a common terminology for understanding the security requirements applicable to wallet architectures and wallet-to-wallet and wallet-to-issuer/verifier protocols. Classify, specify and describe security architectures common to wallets( risks, motivation, etc..) Produce guidelines for how to classify and specify the security capabilities of verifiable-credential wallets such as key management, credential storage, device-binding, credential exchange, backup, recovery, and portability of wallets.",
    charters: {
      "Wallet Security WG documentation": {
        links: [
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_Wallet_Security_WG_Charter_20210616.pdf"
          },
          {
            text: "Agenda/GitHub",
            href: "https://github.com/decentralized-identity/wallet-security/blob/main/agenda.md"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/wallet-security"
          },
          {
            text: "Slack channel (members only)",
            href: "https://difdn.slack.com/archives/C021M5U74F6"
          },
          {
            text: "WG GitHub Repos",
            href: "https://github.com/decentralized-identity?q=wg-ws&type=&language=&sort="
          },
          {
            text: "WG Meeting Recordings",
            href: "https://docs.google.com/spreadsheets/d/1wgccmMvIImx30qVE9GhRKWWv3vmL2ZyUauuKx3IfRmA/edit?gid=194851117#gid=194851117"
          }
        ]
      }
    },
    chairs: {
      "Paul Grehan": {
        title: "Founder @ YellowDotPink",
        photo: "/images/photos/paul-grehan.jpg",
        linkedin: "paul-grehan"
      }
    }
  },
  "crypto": {
    name: "Applied Crypto",
    logo: "crypto",
    title: "Applied Crypto Working Group",
    shortform: "Crypto",
    repoTag: "wg-crypto",
    scope: "The Cryptography Working Group will explore cryptographic protocols and -primitives related to Decentralized Identity, including, but not limited to, specific and actual cryptographic topics, such as BBS+ signatures and revocation strategies, as well as signature suites and encryption. The working group will define focus topics, create cryptographic protocols, and choose the underlying cryptographic primitives for them.",
    charters: {
      "Crypto WG documentation": {
        links: [
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_Applied_Crypto_WG_v1.pdf"
          },
          {
            text: "Agenda/GitHub",
            href: "https://github.com/decentralized-identity/crypto-wg/blob/main/agenda.md"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/crypto-wg"
          },
          {
            text: "Slack channel (members only)",
            href: "https://difdn.slack.com/archives/C021JUSRXC0"
          },
          {
            text: "Calendar entry",
            href: "https://calendar.google.com/event?action=TEMPLATE&tmeid=bGlsYWw4aDJwODljZGYyNGhkYnV2dW85bTNfMjAyNTAxMjBUMTkwMDAwWiBkZWNlbnRyYWxpemVkLmlkZW50aXR5QG0=&tmsrc=decentralized.identity%40gmail.com&scp=ALL"
          },
          {
            text: "WG GitHub Repos",
            href: "https://github.com/decentralized-identity?q=+wg-crypto&type=&language=&sort="
          },
          {
            text: "WG Meeting Recordings",
            href: "https://docs.google.com/spreadsheets/d/1wgccmMvIImx30qVE9GhRKWWv3vmL2ZyUauuKx3IfRmA/edit?gid=339046779#gid=339046779"
          }
        ]
      }
    },
    projects: {
      "BBS+ 2.0": {
        desc: "BBS+ signatures are a pairing-based cryptographic signature scheme that supports multi-message signing and selective disclosure proofs.",
        links: [
          {
            text: "BBS+ Specification",
            type: "doc",
            href: "https://identity.foundation/bbs-signature/"
          },
          {
            text: "GitHub Repository",
            href: "https://github.com/decentralized-identity/bbs-signature"
          }
        ]
      }
    },
    chairs: {
      "Brent Zundel": {
        title: "Crypto @ Evernym",
        photo: "/images/photos/brent-zundel.jpg",
        linkedin: "bzundel"
      },
      "Tobias Looker": {
        title: "OSS @ Mattr ",
        photo: "/images/photos/tobias-looker.jpg",
        linkedin: "tplooker",
        twitter: "tplooker"
      },
      "Srinath Setty": {
        title: "Research @ Microsoft",
        photo: "/images/photos/srinath-setty.jpg",
        linkedin: "srinathtv",
        twitter: "srinathtv"
      }
    }
  },
  "storage-compute": {
    name: "Storage and Compute",
    logo: "network",
    title: "[retired] Storage and Compute Working Group",
    repoTag: "wg-sc",
    scope: "Secure, encrypted, privacy-preserving storage and computation of data is a critical component of decentralized identity systems. As with identifiers and names must be self-sovereign to the owning entity, a user's identity data must remain private, only accessible to the entities they allow. DIF members are actively developing specs and reference implementations for provider-agnostic, run-anywhere solutions that provides these features.",
    charters: {
      "Storage and Compute WG documentation": {
        links: [
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_Storage_Compute_WG_charter_v1.pdf"
          },
          {
            text: "Agenda/GitHub",
            href: "https://github.com/decentralized-identity/confidential-storage/blob/master/agenda.md"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/storage-compute"
          },
          {
            text: "WG GitHub Repos",
            href: "https://github.com/decentralized-identity?q=wg-sc&type=&language=&sort="
          }
        ]
      }
    },
    projects: {
      "Storage and Compute Projects": {
        "Identity Hubs": {
          desc: "Encrypted personal datastore for identity interactions and decentralized apps.",
          links: [
            {
              text: "System Diagram",
              href: "https://raw.githubusercontent.com/decentralized-identity/hubs/master/diagrams/full-system.png"
            },
            {
              text: "Explainer",
              href: "https://github.com/decentralized-identity/hubs/blob/master/explainer.md"
            },
            {
              text: "Repo",
              href: "https://github.com/decentralized-identity/hub-node-core"
            }
          ]
        }
      }
    },
    chairs: {
      "Storage and Compute Chair": {
        title: "Storage and Compute Chair Title",
        photo: "/images/photos/storage-compute-chair.jpg",
        linkedin: "storage-compute-chair-linkedin",
        twitter: "storage-compute-chair-twitter"
      }
    }
  },
  "keri": {
    name: "KERI",
    logo: "key",
    repoTag: "wg-keri",
    title: "KERI Working Group (Archived)",
    charters: {
      "KERI WG documentation": {
        links: [
          {
            text: "WG Charter",
            href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_KERI_WG_charter_v1.pdf"
          },
          {
            text: "Mailing list",
            href: "https://lists.identity.foundation/g/keri-wg"
          },
          {
            text: "Calendar entry",
            href: "https://calendar.google.com/event?action=TEMPLATE&tmeid=dTRpa3JmNThiZGczc2FzZHQ0bnFsdGRjcGxfMjAyNTAxMTVUMTcwMDAwWiBkZWNlbnRyYWxpemVkLmlkZW50aXR5QG0=&tmsrc=decentralized.identity%40gmail.com&scp=ALL"
          },
          {
            text: "WG participants",
            href: "https://github.com/decentralized-identity?q=wg-keri&type=&language=&sort="
          },
          {
            text: "WG Meeting Recordings",
            href: "https://docs.google.com/spreadsheets/d/1wgccmMvIImx30qVE9GhRKWWv3vmL2ZyUauuKx3IfRmA/edit?gid=242845701#gid=242845701"
          }
        ]
      }
    },
    projects: {
    },
    chairs: {
      "KERI Chair": {
        title: "KERI Chair Title",
        photo: "/images/photos/keri-chair.jpg",
        linkedin: "keri-chair-linkedin",
        twitter: "keri-chair-twitter"
      }
    }
  }
}; 