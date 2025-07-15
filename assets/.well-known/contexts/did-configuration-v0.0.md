# DID Configuration Context

- [Latest JSON-LD Context](./did-configuration-v0.0.jsonld)

### Terminology

<h4 id="domainLinkageAssertion"><a href="#domainLinkageAssertion">domainLinkageAssertion</a></h4>

A claim object with fields for domain linkage assertions.

<h4 id="origin"><a href="#origin">domain</a></h4>

The origin being claimed to be linked to the DID in the domainLinkageAssertion.

<h4 id="entries"><a href="#entries">entries</a></h4>

The list of did entities that are linked with this domain configuration by vc data model proofs.

<h4 id="did"><a href="#did">did</a></h4>

A decentralized identifier that is linked via a domain linkage assertion vc.

<h4 id="vc"><a href="#vc">vc</a></h4>

A verifiable credential proof for domain linkage assertion. Must be a valid VC-JWT or Linked Data Credential.
