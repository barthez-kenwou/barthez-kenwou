<!--
  File        : readme/sections/03-case-study-devsecops.md
  Section     : Case Study — DevSecOps Supply Chain
  Purpose     : Accordion: industrial DevSecOps pipeline.
  Maintenance : Edit this file, then run `node scripts/build-readme.mjs` to regenerate README.md.
  Note        : HTML comments are stripped from the published README.md output.
-->


<details name="case-studies">
<summary><h3><b>▸ DevSecOps Supply Chain</b> — Secure Software Supply Chain · Industrial CI/CD · Active · <b>CLICK TO EXPAND ▾</b></h3></summary>

<br/>

<img src="https://img.shields.io/badge/DevSecOps_Supply_Chain-Industrial_SLSA-22C55E?style=for-the-badge&amp;logo=snyk&amp;logoColor=white"/>
<a href="https://barthez-kenwou.dev/projects/6"><img src="https://img.shields.io/badge/CASE_STUDY-barthez--kenwou.dev-FF6B35?style=flat-square&amp;logo=hashnode&amp;logoColor=white" alt="View case study"/></a>
<a href="https://github.com/ZENORA-360/zenora360/tree/main/.github"><img src="https://img.shields.io/badge/PIPELINE-GitHub_Actions-2088FF?style=flat-square&amp;logo=githubactions&amp;logoColor=white" alt="Pipeline source"/></a>
<img src="https://img.shields.io/badge/STATUS-Active-22C55E?style=flat-square"/>
<img src="https://img.shields.io/badge/ROLE-DevOps_Engineer-0F172A?style=flat-square"/>

<br/><br/>

| **Challenge** | **Approach** | **Outcome** |
|:---:|:---|:---|
| Classic CI/CD ignores modern supply chain attacks (dependency poisoning, image tampering, secret leaks) | Industrial DevSecOps platform — SLSA-aligned pipeline with SBOM, signing, policy gates | ~60–70% reduction in critical production vulnerabilities |
| No artifact traceability across Node.js &amp; Java microservices on VPS | Syft SBOM + Grype/Trivy scans + Cosign/Sigstore verification via Harbor registry | Compromised dependencies &amp; unsigned images blocked automatically |
| Security scans slowing delivery without measurable DevOps KPIs | Reusable composite actions, parallel jobs, caching + Prometheus/Grafana DORA metrics | 10–20 builds/day · MTTR &lt; 1h · change failure rate &lt; 10% |

<br/>

**Industrial DevSecOps pipeline — multi-environment supply chain**

<!-- mermaid: case-studies/devsecops-pipeline.mmd -->

<br/>

**Security policy enforcement — threat model to release gate**

<!-- mermaid: case-studies/devsecops-security-policy.mmd -->

<br/>

**Signed artifact lifecycle — commit to production**

<!-- mermaid: case-studies/devsecops-artifact-lifecycle.mmd -->

<br/>

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&amp;logo=githubactions&amp;logoColor=white)
![SonarQube](https://img.shields.io/badge/SonarQube-4E9BCD?style=flat-square&amp;logo=sonarqube&amp;logoColor=white)
![Trivy](https://img.shields.io/badge/Trivy-1904DA?style=flat-square&amp;logo=amazonaws&amp;logoColor=white)
![Cosign](https://img.shields.io/badge/Cosign-Sigstore-7C3AED?style=flat-square&amp;logo=googlecloud&amp;logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&amp;logo=docker&amp;logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&amp;logo=prometheus&amp;logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat-square&amp;logo=grafana&amp;logoColor=white)
![Harbor](https://img.shields.io/badge/Harbor-Registry-60B932?style=flat-square&amp;logo=harbor&amp;logoColor=white)

<br/>

</details>

<img src="https://capsule-render.vercel.app/api?type=soft&amp;color=1E1B4B&amp;height=8&amp;section=footer&amp;text=%20&amp;fontSize=1&amp;fontColor=FFFFFF" width="90%"/>

<br/>

