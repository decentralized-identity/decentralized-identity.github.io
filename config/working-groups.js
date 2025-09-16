module.exports = {
  activeWorkingGroups: {
    "claims-credentials": {
      name: "Claims and Credentials",
      logo: "validate_user",
      title: "Claims and Credentials Working Group",
      type: "wg",
      shortform: "CC WG",
      repoTag: "wg-cc",
      scope:
        "Join this group to contribute to the standards and technology that create, exchange, and verify claims and credentials in a decentralized identity ecosystem. For example, a cryptographically verifiable credential that proves an individual has a college degree or is of a certain age. Our members focus on specs that are vendor agnostic and based on industry standards.",
      meetingSchedule: [
        {
          key: "Credential Trust Establishment",
          value: "Occurs every week on Monday at 17:00:00 UTC",
        },
        {
          key: "Credential Schemas",
          value: "Occurs every 2 weeks on Tuesday at 17:00:00 UTC",
        },
      ],
      discussionChannels: [
        {
          text: "Mailing list",
          href: "https://lists.identity.foundation/g/cc-wg",
        },
      ],
      charters: {
        "Claims and Credentials WG documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_CC_WG_charter_v1.pdf",
            },
            {
              text: "Agenda/GitHub",
              href: "https://github.com/decentralized-identity/claims-credentials/blob/main/AGENDA.md",
            },
            {
              text: "WG GitHub Repos",
              href: "https://github.com/decentralized-identity?q=wg-cc&type=&language=&sort=",
            },
          ],
        },
      },
      projects: {
        "WACI-DIDComm": {
          desc: "WACI-DIDComm is an initiative to create a common stack for wallet and credential interactions leveraging features of DIDComm V2 messaging protocol (along with Aries Present Proof message formats and DIF Presentation Exchange data objects).",
          links: [
            {
              text: "Specification",
              type: "doc",
              href: "https://identity.foundation/waci-didcomm",
            },
            {
              text: "Repo",
              href: "https://github.com/decentralized-identity/waci-didcomm",
            },
          ],
        },
        "Credential Manifest": {
          desc: "The DID Credential Manifest is a format that aims to normalize the process of credential acquisition, wherein the issuer is able to describe the requirements the subject or participant in the credential generation process must meet for the issuer to generate the desired credential.",
          links: [
            {
              text: "Specification",
              type: "doc",
              href: "https://identity.foundation/credential-manifest",
            },
            {
              text: "Repo",
              href: "https://github.com/decentralized-identity/credential-manifest",
            },
          ],
        },
        "VC JSON Schemas": {
          desc: "The VC JSON Schema specification aims to provide a standardized mechanism to use JSON Schemas as the data backing for Verifiable Credentials. Though the repository lives in the W3C-CCG, this working group contains key contributors and has a vested interest in contributing to the development of the specification.",
          links: [
            {
              text: "Specification",
              type: "doc",
              href: "https://w3c-ccg.github.io/vc-json-schemas/",
            },
            {
              text: "Repo",
              href: "https://github.com/w3c-ccg/vc-json-schemas",
            },
          ],
        },
      },
      chairs: {
        "Valerio Massimo Camaiani": {
          title: "SWE at Crossmint",
          photo: "/images/photos/valerio-camaiani.jpeg",
          linkedin: "vmcvastry",
        },
        "Otto Mora": {
          title: "Growth Team, Privado ID",
          photo: "/images/photos/otto-mora.jpg",
          linkedin: "otto-mora",
          twitter: "ottomorac",
        },
      },
      url: "/working-groups/claims-credentials.html",
    },
    "did-methods": {
      name: "DID Methods",
      logo: "blueprint",
      title: "DID Methods Working Group",
      type: "wg",
      shortform: "DID Methods WG",
      repoTag: "wg-dm",
      scope:
        "Members of this Working Group are creating specifications to standardize an initial set of commonly used DID methods and develop strategies for collaborative, scalable, self-help standardization of DID methods more broadly.",
      meetingSchedule: [
        {
          key: "",
          value: "Occurs every Wednesday at 16:00:00 UTC",
        },
      ],
      discussionChannels: [
        {
          text: "Mailing list",
          href: "https://lists.identity.foundation/g/did-methods-wg",
        },
      ],
      charters: {
        "DID Methods WG documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/main/Org%20documents/WG%20documents/DIF_DID_Methods_WG_Charter_v1.pdf",
            },
            {
              text: "Group Working Repository",
              href: "https://github.com/decentralized-identity/did-methods",
            },
            {
              text: "WG GitHub Repos",
              href: "https://github.com/decentralized-identity?q=+wg-dm&type=&language=&sort=",
            },
          ],
        },
      },
      chairs: {
        "Matt McKinney": {
          title: "Growth @ ArcBlock",
          photo: "/images/photos/matt-mckinney.jpeg",
          linkedin: "mtmckinney",
          twitter: "RobRoyHobbs",
        },
        "Jonathan Rayback": {
          title: "Owner @ Future Forge Innovation",
          photo: "/images/photos/jonathan-rayback.jpg",
          linkedin: "jonathan-rayback",
        },
        "Markus Sabadello": {
          title: "Founder @ Danube Tech",
          photo: "/images/photos/markus-sabadello.jpg",
          linkedin: "markus-sabadello-353a0821",
          twitter: "peacekeeper",
        },
      },
      url: "/working-groups/did-methods.html",
    },
    "creator-assertions": {
      name: "Creator Assertions",
      logo: "signature",
      title: "Creator Assertions Working Group",
      type: "wg",
      shortform: "CAWG",
      repoTag: "wg-ca",
      scope:
        "The Creator Assertions Working Group builds upon the work of the Coalition for Content Provenance and Authenticity (C2PA) by defining additional assertions that allow content creators to express individual and organizational intent about their content.",
      meetingSchedule: [
        {
          key: "Americas/EU Time Zones",
          value: "Occurs every 2 weeks on Monday at 16:00:00 UTC",
        },
        {
          key: "Topical Calls - Media Industry Identifiers",
          value:
            "Occurs every 2 weeks on Monday at 16:00:00 UTC, alternating with the Americas/EU meeting",
        },
      ],
      discussionChannels: [
        {
          text: "Mailing list",
          href: "https://lists.identity.foundation/g/cawg",
        },
      ],
      charters: {
        "Creator Assertions WG documentation": {
          links: [
            {
              text: "Group Home",
              href: "https://cawg.io/",
            },
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/main/Org%20documents/WG%20documents/DIF_CAWG_WG_charter_v1.pdf",
            },
            {
              text: "WG Operating Addendum",
              href: "https://github.com/decentralized-identity/org/blob/main/Org%20documents/WG%20documents/DIF_CAWG_WG_Operating_Addendum_v1.pdf",
            },
          ],
        },
      },
      chairs: {
        "Eric Scouten": {
          title:
            "Identity Standards Architect, Content Authenticity Initiative @ Adobe",
          photo: "/images/photos/eric-scouten.jpg",
          linkedin: "ericscouten",
          bluesky: "ericscouten.me",
        },
        "Scott Perry": {
          title: "CEO @ Digital Governance Institute",
          photo: "/images/photos/scott-perry.jpg",
          linkedin: "scott-perry-1b7a254",
        },
      },
      url: "/working-groups/creator-assertions.html",
    },
    "did-comm": {
      name: "DIDComm",
      logo: "communicate_user",
      title: "DIDComm Working Group",
      type: "wg",
      shortform: "DIDcomm",
      repoTag: "wg-didcomm",
      scope:
        "Join this group to contribute to specs that embody a method for secure, private and authenticated message-based communication, where trust is rooted in DIDs and used over a wide variety of transports.",
      meetingSchedule: [
        {
          key: "",
          value: "Occurs every month on first Monday at 19:00:00 UTC",
        },
      ],
      discussionChannels: [
        {
          text: "Mailing list",
          href: "https://lists.identity.foundation/g/didcomm-wg",
        },
      ],
      charters: {
        "DIDcomm WG documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_DIDcomm_WG_Charter_v1.pdf",
            },
            {
              text: "WG Operating Addendum",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_DIDcomm_WG_Operating_Addendum_v1.pdf",
            },
            {
              text: "DIDComm Homepage",
              href: "https://didcomm.org",
            },
            {
              text: "DIDComm Book",
              href: "https://book.didcomm.org",
            },
            {
              text: "DIDComm User Group Resources",
              href: "https://identity.foundation/didcomm-usergroup/",
            },
          ],
        },
      },
      chairs: {
        "Sam Curren": {
          title: "Technology Guy",
          photo: "/images/photos/sam-curren.jpg",
          linkedin: "samcurren",
          twitter: "telegramsam",
        },
        "Steve McCown": {
          title: "Chief Architect @ Anonyome Labs",
          photo: "/images/photos/steve-mccown.jpeg",
          linkedin: "mccown",
        },
      },
      url: "/working-groups/did-comm.html",
    },
    "hospitality-travel-wg": {
      name: "Hospitality & Travel WG",
      logo: "communicate_user",
      title: "Hospitality & Travel Working Group",
      type: "wg",
      shortform: "HT WG",
      repoTag: "wg-ht",
      scope:
        "To create standards, schemas, processes, and related documentation designed to support the exchange of self-sovereign data of travelers, services, and intermediaries in the hospitality and travel industry, and their AI agents.",
      meetingSchedule: [
        {
          key: "Working Group Meetings",
          value: "Meets every Tuesday and Friday at 14:00:00 UTC",
        },
      ],
      discussionChannels: [
        {
          text: "Mailing list",
          href: "https://lists.identity.foundation/g/hospitalityandtravel-wg",
        },
      ],
      charters: {
        "Hospitality Travel WG documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/main/Org%20documents/WG%20documents/DIF_HT_WG_charter_v1.pdf",
            },
            {
              text: "Hospitality & Travel WG website",
              href: "https://htwg.identity.foundation/",
            },
          ],
        },
      },
      chairs: {
        "Douglas Rice": {
          title: "Sole Member @ Hospitality Technology Network, LLC",
          photo: "/images/photos/doug-rice.jpg",
          linkedin: "ricedouglas",
        },
        "Neil Thomson": {
          title: "Principal Consultant @ QueryVision",
          photo: "/images/photos/neil-thomson.jpg",
          linkedin: "neiljthomson",
          twitter: "NJT_Techno",
          bluesky: "njt-techno.bsky.social",
        },
      },
      url: "/working-groups/hospitality-travel-wg.html",
    },
    "identifiers-discovery": {
      name: "Identifiers & Discovery",
      logo: "user_graph",
      title: "Identifiers and Discovery Working Group",
      shortform: "ID WG",
      type: "wg",
      repoTag: "wg-id",
      scope:
        "Members of the Working Group are engaged in development of protocols and systems that enable creation, resolution, and discovery of decentralized identifiers and names across underlying decentralized systems, like blockchains and distributed ledgers.",
      meetingSchedule: [
        {
          key: "Bi-weekly Identifiers & Discovery",
          value: "Occurs every 2 weeks on Monday at 18:00:00 UTC",
        },
        {
          key: "did:webvh",
          value: "Occurs every 2 weeks on Thursday at 16:00:00 UTC",
        },
      ],
      discussionChannels: [
        {
          text: "Mailing list",
          href: "https://lists.identity.foundation/g/id-wg",
        },
      ],
      charters: {
        "Identifiers and Discovery WG documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_ID_WG_charter_v1.pdf",
            },
            {
              text: "Agenda/GitHub",
              href: "https://github.com/decentralized-identity/identifiers-discovery/",
            },
          ],
        },
      },
      projects: {
        "Universal Resolver": {
          desc: "Specification and implementation of a driver-based framework that enables resolution of DIDs.",
          links: [
            {
              text: "Main Repo",
              href: "https://github.com/decentralized-identity/universal-resolver",
            },
            {
              text: "Public Instance",
              type: "app",
              href: "https://uniresolver.io/",
            },
            {
              text: "Driver Development",
              href: "https://github.com/decentralized-identity/universal-resolver/blob/master/docs/driver-development.md",
            },
          ],
        },
        "Universal Registrar": {
          desc: "Specification and implementation of a driver-based framework that enables creation/updates/deactivation of DIDs.",
          links: [
            {
              text: "Main Repo",
              href: "https://github.com/decentralized-identity/universal-registrar",
            },
            {
              text: "Public Instance",
              type: "app",
              href: "https://uniregistrar.io/",
            },
            {
              text: "Driver Development",
              href: "https://github.com/decentralized-identity/universal-registrar/blob/master/docs/driver-development.md",
            },
          ],
        },
        ".well-known DID configuration": {
          desc: "Specification, docs, and implementations for discovering DIDs from .well-known HTTP(S) URIs.",
          links: [
            {
              text: "Specification",
              type: "doc",
              href: "https://identity.foundation/specs/did-configuration/",
            },
            {
              text: "Main Repo",
              href: "https://github.com/decentralized-identity/.well-known/",
            },
            {
              text: "Demo Web App",
              type: "app",
              href: "https://identity.foundation/.well-known/resources/did-configuration/demo/build/index.html",
            },
          ],
        },
        "Peer DID Method Specification": {
          desc: "A rich DID method that has no blockchain dependencies. The verifiable data registry is a synchronization protocol between peers.",
          links: [
            {
              text: "Specification",
              type: "doc",
              href: "https://identity.foundation/peer-did-method-spec/",
            },
            {
              text: "Main Repo",
              href: "https://github.com/decentralized-identity/peer-did-method-spec",
            },
          ],
        },
        "DID Specification Extensions": {
          desc: " Extension parameters, properties, and values for the DID spec registries.",
          links: [
            {
              text: "Main Repo",
              href: "https://github.com/decentralized-identity/did-spec-extensions",
            },
          ],
        },
        "did:webvh": {
          desc: "did:webvh DID Method.",
          links: [
            {
              text: "Specification",
              type: "doc",
              href: "https://identity.foundation/didwebvh/",
            },
            {
              text: "Main Repo",
              href: "https://github.com/decentralized-identity/didwebvh",
            },
          ],
        },
        "Linked Verifiable Presentation": {
          desc: "Specification for linking Verifiable Presentations in DID documents.",
          links: [
            {
              text: "Specification",
              type: "doc",
              href: "https://identity.foundation/linked-vp",
            },
            {
              text: "Main Repo",
              href: "https://github.com/decentralized-identity/linked-vp",
            },
          ],
        },
        "DID Traits": {
          desc: "Specification for representing DID method traits in a structured, machine-readable format.",
          links: [
            {
              text: "Specification",
              type: "doc",
              href: "https://identity.foundation/did-traits",
            },
            {
              text: "Main Repo",
              href: "https://github.com/decentralized-identity/did-traits",
            },
          ],
        },
      },
      chairs: {
        "Markus Sabadello": {
          title: "Founder @ Danube Tech",
          photo: "/images/photos/markus-sabadello.jpg",
          linkedin: "markus-sabadello-353a0821",
          twitter: "peacekeeper",
        },
        "Jan Christoph Ebersbach": {
          title: "Founder @ identinet",
          photo: "/images/photos/Jan-Christoph-Ebersbach-cropped.jpg",
          linkedin: "JCEbersbach",
          twitter: "JCEbersbach",
        },
      },
      url: "/working-groups/identifiers-discovery.html",
    },
    crypto: {
      name: "Applied Crypto",
      logo: "crypto",
      title: "Applied Crypto Working Group",
      shortform: "Crypto",
      type: "wg",
      repoTag: "wg-crypto",
      scope:
        "The Cryptography Working Group will explore cryptographic protocols and -primitives related to Decentralized Identity, including, but not limited to, specific and actual cryptographic topics, such as BBS+ signatures and revocation strategies, as well as signature suites and encryption. The working group will define focus topics, create cryptographic protocols, and choose the underlying cryptographic primitives for them.",
      meetingSchedule: [
        {
          key: "BBS+ Work Item",
          value: "Occurs every week on Monday at 18:00:00 UTC",
        },
      ],
      discussionChannels: [
        {
          text: "Mailing list",
          href: "https://lists.identity.foundation/g/crypto-wg",
        },
      ],
      charters: {
        "Crypto WG documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_Applied_Crypto_WG_v1.pdf",
            },
            {
              text: "Agenda/GitHub",
              href: "https://github.com/decentralized-identity/crypto-wg/blob/main/agenda.md",
            },
            {
              text: "WG GitHub Repos",
              href: "https://github.com/decentralized-identity?q=+wg-crypto&type=&language=&sort=",
            },
          ],
        },
      },
      projects: {
        "BBS+ 2.0": {
          desc: "BBS+ signatures are a pairing-based cryptographic signature scheme that supports multi-message signing and selective disclosure proofs.",
          links: [
            {
              text: "BBS+ Specification",
              type: "doc",
              href: "https://identity.foundation/bbs-signature/",
            },
            {
              text: "GitHub Repository",
              href: "https://github.com/decentralized-identity/bbs-signature",
            },
          ],
        },
      },
      chairs: {
        "Brent Zundel": {
          title: "Crypto @ Evernym",
          photo: "/images/photos/brent-zundel.jpg",
          linkedin: "bzundel",
        },
        "Tobias Looker": {
          title: "OSS @ Mattr ",
          photo: "/images/photos/tobias-looker.jpg",
          linkedin: "tplooker",
          twitter: "tplooker",
        },
        "Srinath Setty": {
          title: "Research @ Microsoft",
          photo: "/images/photos/srinath-setty.jpg",
          linkedin: "srinathtv",
          twitter: "srinathtv",
        },
      },
      url: "/working-groups/crypto.html",
    },
    labs: {
      name: "Labs",
      logo: "flask",
      title: "Labs Working Group",
      shortform: "Labs",
      type: "wg",
      repoTag: "wg-labs",
      scope:
        "The DIF Labs Working Group serves as an incubation environment for decentralized identity-based user applications and spec implementations. The WG provides an IP-safe environment for general implementation-related discussion, and allows participants to propose and participate in WG Work Items, each of which is focused on a user application and/or spec implementation.",
      discussionChannels: [
        {
          text: "Discord: #labs-discussion",
          href: "https://discord.gg/wAk4FtRK",
        },
      ],
      meetingSchedule: [
        {
          key: "Labs Meetings",
          value:
            "When in session, meets every fourth Tuesday of the month 15:00:00 UTC. See https://labs.identity.foundation/ for more information.",
        },
      ],
      charters: {
        "Labs WG documentation": {
          links: [
            {
              text: "DIF Labs Official Site",
              href: "https://labs.identity.foundation/",
            },
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/labs/blob/d2036078b7c743eb6b86347557f215e880c6dcb5/docs/charter.md",
            },
          ],
        },
      },
      url: "/working-groups/labs.html",
    },
    "trusted-agents": {
      name: "Trusted AI Agents",
      logo: "ai-agent",
      title: "Trusted AI Agents Working Group",
      shortform: "Trusted Agents",
      type: "wg",
      repoTag: "wg-ag",
      scope:
        "The Trusted AI Agents Working Group (WG) at the Decentralized Identity Foundation (DIF) focuses on defining an opinionated, interoperable stack to enable trustworthy, privacy-preserving, and secure AI agents. These agents act on behalf of users or systems and require robust mechanisms for identity, authority, and governance.",
      discussionChannels: [
        {
          text: "Mailing list",
          href: "https://lists.identity.foundation/g/taawg",
        },
      ],
      meetingSchedule: [
        {
          key: "",
          value: "Starts Sept 30, 2025. Meets every Tuesday at 15:00:00 UTC.",
        },
      ],
      charters: {
        "Trusted AI Agents WG documentation": {
          links: [
            {
              text: "Charter",
              href: "https://github.com/decentralized-identity/org/blob/main/Org%20documents/WG%20documents/DIF_Trusted_AI_Agents_WG_charter_v1.pdf",
            },
            {
              text: "Operating Addendum",
              href: "https://github.com/decentralized-identity/org/blob/main/Org%20documents/WG%20documents/DIF_Trusted_AI_Agents_WG_Operating_Addendum_v1.pdf",
            },
          ],
        },
      },
      chairs: {
        "Nicola Gallo": {
          title: "Cofounder and CTO @ Nitro Agility S.r.l.",
          photo: "/images/photos/nicola-gallo.jpg",
          linkedin: "nicolagallo83",
          twitter: "ngallo83",
        },
        "Andor Kesselman ": {
          title: "CEO @ Agent Overlay, Inc",
          photo: "/images/photos/andor-kesselman.jpg",
          linkedin: "andorsk",
        },
        "Dmitri Zagidulin": {
          title: "Lead Architect @ Digital Credentials Consortium",
          photo: "/images/photos/dima.jpg",
          linkedin: "dzagidulin",
        },
      },
      url: "/working-groups/trusted-agents.html",
    },
  },
  archivedWorkingGroups: {
    authentication: {
      name: "DID Authentication",
      logo: "login_screen",
      title: "Authentication Working Group",
      shortform: "DID Auth WG",
      type: "wg",
      repoTag: "wg-auth",
      scope:
        "Since December 2020, this work is hosted by the Open Identity Foundation. This group to contribute to standards and technology that designs and implements authentication protocols that rely upon open standards and cryptographic protocols, including DIDs and DID Documents. This group develops specifications, protocols, and formats for data structures used for authentication.",
      charters: {
        "DIDAuth WG documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_DIDAuth_WG_charter_v1.pdf",
            },
            {
              text: "Mailing list",
              href: "https://lists.identity.foundation/g/didauth-wg",
            },
            {
              text: "WG GitHub Repos",
              href: "https://github.com/decentralized-identity?q=wg-id&type=&language=",
            },
          ],
        },
      },
      projects: {
        "DID Authentication Profile for SIOP": {
          desc: "This specification defines the SIOP DID AuthN flavor to use OpenID Connect (OIDC) together with the strong decentralization, privacy and security guarantees of DID for everyone who wants to have a generic way to integrate SSI wallets into their web applications.",
          links: [
            {
              text: "OIDF - SIOP v2 (draft)",
              href: "https://openid.net/specs/openid-connect-self-issued-v2-1_0.html",
            },
            {
              text: "OIDF - SIOP v2 (most recent editor's draft )",
              href: "https://openid.bitbucket.io/connect/openid-connect-self-issued-v2-1_0.html",
            },
            {
              text: "Explainer - outdated. New work carried out under OIDF",
              href: "https://github.com/decentralized-identity/papers/blob/master/did-authn/siop/did-authn-siop-profile.md",
            },
            {
              text: "Repo - outdated. New work carried out under OIDF",
              href: "https://github.com/decentralized-identity/did-siop",
            },
          ],
        },
        "DIDComm JS Lib": {
          desc: "A shared effort with the HL Aries project to create a standardized means of authenticated general message passing between DID controllers. More information will be added soon.",
          links: [
            {
              text: "Repo",
              href: "https://github.com/decentralized-identity/DIDComm-js",
            },
          ],
        },
      },
      url: "/working-groups/authentication.html",
    },
    "secure-data-storage": {
      name: "Secure Data Storage",
      logo: "box",
      title: "Secure Data Storage Working Group",
      shortform: "SDS WG",
      repoTag: "wg-sds",
      type: "wg",
      scope:
        "Create one or more specifications to establish a foundational layer for secure data storage (including personal data), specifically data models for storage and transport, syntax, data at rest protection, CRUD API, access control, synchronization, and at least a minimum viable HTTP-based interface compatible with W3C DIDs/VCs.",
      charters: {
        "SDS WG documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_SDS_WG_charter_v1.pdf",
            },
            {
              text: "Operating Addendum",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_SDS_WG_Operating_Addendum_v1.pdf",
            },
            {
              text: "Agenda/GitHub",
              href: "https://github.com/decentralized-identity/confidential-storage/blob/master/agenda.md",
            },
            {
              text: "Mailing list",
              href: "https://lists.identity.foundation/g/sds-wg/",
            },
            {
              text: "WG GitHub Repos",
              href: "https://github.com/decentralized-identity?q=wg-sds&type=&language=&sort=",
            },
          ],
        },
      },
      projects: {
        "Decentralized Web Node": {
          desc: "A Decentralized Web Node (DWN) is a data storage and message relay mechanism entities can use to locate public or private permissioned data related to a given Decentralized Identifier (DID).",
          links: [
            {
              text: "Specification",
              type: "doc",
              href: "https://identity.foundation/decentralized-web-node/spec/",
            },
            {
              text: "Repo",
              href: "https://github.com/decentralized-identity/decentralized-web-node",
            },
          ],
        },
        "Encrypted Data Vaults (Archived)": {
          desc: "This specification describes a privacy-respecting mechanism for storing, indexing, and retrieving encrypted data at a storage provider. It is often useful when an individual or organization wants to protect data in a way that the storage provider cannot view, analyze, aggregate, or resell the data. This approach also ensures that application data is portable and protected from storage provider data breaches.",
          links: [
            {
              text: "Specification",
              type: "doc",
              href: "https://identity.foundation/edv-spec/",
            },
            {
              text: "Repo",
              href: "https://github.com/decentralized-identity/edv-spec/",
            },
          ],
        },
      },
      chairs: {
        "Andor Kesselman": {
          title: "Co-Founder and CTO @ Benri ",
          photo: "/images/photos/andor-kesselman.jpg",
          linkedin: "andorsk",
        },
      },
      url: "/working-groups/secure-data-storage.html",
    },
    sidetree: {
      name: "Sidetree",
      logo: "sidetree",
      type: "wg",
      title: "Sidetree Development & Operating Group",
      shortform: "Sidetree",
      repoTag: "wg-sidetree",
      scope:
        "The development and maintenance of the formal Sidetree specification, and a hub of coordination for Sidetree-based DID Method node operators. This group also generates libraries, tooling, and documentation to aid Sidetree-based DID Method node operators.",
      charters: {
        "Sidetree Development & Operating Group documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_Sidetree_WG_charter_v1.pdf",
            },
            {
              text: "Agenda/GitHub",
              href: "https://github.com/decentralized-identity/sidetree/blob/master/agenda.md",
            },
            {
              text: "Mailing list",
              href: "https://lists.identity.foundation/g/sidetree-wg",
            },
            {
              text: "WG GitHub Repos",
              href: "https://github.com/decentralized-identity?q=+wg-sidetree&type=&language=&sort=",
            },
          ],
        },
      },
      projects: {
        "Sidetree Protocol": {
          desc: "Specification, docs, and implementations for the chain/ledger-agnostic DID scaling protocol.",
          links: [
            {
              text: "Main Repo",
              href: "https://github.com/decentralized-identity/sidetree-core",
            },
            {
              text: "Specification",
              type: "doc",
              href: "https://identity.foundation/sidetree/spec/",
            },
          ],
        },
        ION: {
          desc: "An implementation of the Sidetree protocol atop the Bitcoin blockchain.",
          links: [
            {
              text: "Main Repo",
              href: "https://github.com/decentralized-identity/ion",
            },
            {
              text: "Install Guide",
              href: "https://github.com/decentralized-identity/ion/blob/master/install-guide.md",
            },
          ],
        },
        Element: {
          desc: "An implementation of the Sidetree protocol using the Ethereum blockchain.",
          links: [
            {
              text: "Main Repo",
              href: "https://github.com/decentralized-identity/element",
            },
            {
              text: "Demo Wallet & Explorer",
              type: "app",
              href: "https://element-did.com/",
            },
          ],
        },
      },
      url: "/working-groups/sidetree.html",
    },
    "wallet-security": {
      name: "Wallet Security",
      logo: "wallet",
      title: "Wallet Security Working Group",
      shortform: "WS WG",
      repoTag: "wg-ws",
      type: "wg",
      scope:
        "Define a common terminology for understanding the security requirements applicable to wallet architectures and wallet-to-wallet and wallet-to-issuer/verifier protocols. Classify, specify and describe security architectures common to wallets( risks, motivation, etc..) Produce guidelines for how to classify and specify the security capabilities of verifiable-credential wallets such as key management, credential storage, device-binding, credential exchange, backup, recovery, and portability of wallets.",
      charters: {
        "Wallet Security WG documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_Wallet_Security_WG_Charter_20210616.pdf",
            },
            {
              text: "Agenda/GitHub",
              href: "https://github.com/decentralized-identity/wallet-security/blob/main/agenda.md",
            },
            {
              text: "Mailing list",
              href: "https://lists.identity.foundation/g/wallet-security",
            },
            {
              text: "WG GitHub Repos",
              href: "https://github.com/decentralized-identity?q=wg-ws&type=&language=&sort=",
            },
          ],
        },
      },
      url: "/working-groups/wallet-security.html",
    },
    "storage-compute": {
      name: "Storage and Compute",
      logo: "network",
      title: "Storage and Compute Working Group",
      repoTag: "wg-sc",
      type: "wg",
      scope:
        "Secure, encrypted, privacy-preserving storage and computation of data is a critical component of decentralized identity systems. As with identifiers and names must be self-sovereign to the owning entity, a user's identity data must remain private, only accessible to the entities they allow. DIF members are actively developing specs and reference implementations for provider-agnostic, run-anywhere solutions that provides these features.",
      charters: {
        "Storage and Compute WG documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_Storage_Compute_WG_charter_v1.pdf",
            },
            {
              text: "Agenda/GitHub",
              href: "https://github.com/decentralized-identity/confidential-storage/blob/master/agenda.md",
            },
            {
              text: "Mailing list",
              href: "https://lists.identity.foundation/g/storage-compute",
            },
            {
              text: "WG GitHub Repos",
              href: "https://github.com/decentralized-identity?q=wg-sc&type=&language=&sort=",
            },
          ],
        },
      },
      projects: {
        "Storage and Compute Projects": {
          "Identity Hubs": {
            desc: "Encrypted personal datastore for identity interactions and decentralized apps.",
            links: [
              {
                text: "System Diagram",
                href: "https://raw.githubusercontent.com/decentralized-identity/hubs/master/diagrams/full-system.png",
              },
              {
                text: "Explainer",
                href: "https://github.com/decentralized-identity/hubs/blob/master/explainer.md",
              },
              {
                text: "Repo",
                href: "https://github.com/decentralized-identity/hub-node-core",
              },
            ],
          },
        },
      },
    },
    keri: {
      name: "KERI",
      logo: "key",
      type: "wg",
      repoTag: "wg-keri",
      title: "KERI Working Group (Archived)",
      charters: {
        "KERI WG documentation": {
          links: [
            {
              text: "WG Charter",
              href: "https://github.com/decentralized-identity/org/blob/master/Org%20documents/WG%20documents/DIF_KERI_WG_charter_v1.pdf",
            },
            {
              text: "Mailing list",
              href: "https://lists.identity.foundation/g/keri-wg",
            },
          ],
        },
      },
      projects: {},
      url: "/working-groups/keri.html",
    },
  },
};
