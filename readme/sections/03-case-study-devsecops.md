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

```mermaid
flowchart TB
    classDef dev fill:#3B82F6,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef sec fill:#22C55E,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef gate fill:#F59E0B,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef prod fill:#FF6B35,stroke:#0F172A,color:#fff,stroke-width:2px

    subgraph Dev["Developer workflow"]
        CODE["Node.js / Java repos"]
        PR["Pull Request"]
        PUSH["Merge to main"]
    end

    subgraph CI["GitHub Actions — build stage"]
        LINT["Lint · type check"]
        UNIT["Unit · integration tests"]
        SAST["SonarQube SAST"]
        SCA["Dependency SCA"]
        TRIVY["Trivy FS + image scan"]
    end

    subgraph Supply["Supply chain controls"]
        SBOM["Syft SBOM generation"]
        GRYPE["Grype vulnerability scan"]
        POLICY{"CVSS &gt; 7 or unsigned?"}
        SIGN["Cosign / Sigstore sign"]
        HARBOR["Harbor secure registry"]
    end

    subgraph Deploy["Multi-env deployment"]
        STG["Staging · DAST smoke"]
        GATE["Manual release gate"]
        PROD["Production VPS · zero downtime"]
        ROLL["Automated rollback"]
    end

    subgraph Ops["Observability"]
        PROM["Prometheus metrics"]
        GRAF["Grafana dashboards"]
        SLACK["Slack security alerts"]
    end

    CODE --> PR --> PUSH
    PUSH --> LINT --> UNIT --> SAST --> SCA --> TRIVY
    TRIVY --> SBOM --> GRYPE --> POLICY
    POLICY -->|Fail| BLOCK["Block build"]
    POLICY -->|Pass| SIGN --> HARBOR
    HARBOR --> STG --> GATE --> PROD
    PROD --> ROLL
    PROD --> PROM --> GRAF
    POLICY --> SLACK

    class CODE,PR,PUSH dev
    class SAST,SCA,TRIVY,SBOM,GRYPE,SIGN sec
    class GATE,POLICY gate
    class PROD,HARBOR prod
```

<br/>

**Security policy enforcement — threat model to release gate**

```mermaid
flowchart TD
    classDef ok fill:#22C55E,stroke:#0F172A,color:#fff
    classDef warn fill:#F59E0B,stroke:#0F172A,color:#fff
    classDef bad fill:#EF4444,stroke:#0F172A,color:#fff

    A["Artifact produced"] --> B["Generate SBOM · Syft"]
    B --> C["Scan deps · Grype + SCA"]
    C --> D["Scan container · Trivy"]
    D --> E{"Critical CVE CVSS &gt; 7?"}
    E -->|Yes| F["Fail build · notify Slack"]
    E -->|No| G{"Image signed · Cosign?"}
    G -->|No| H["Block deploy · unsigned policy"]
    G -->|Yes| I["Push to Harbor registry"]
    I --> J["Staging deploy + DAST"]
    J --> K{"Smoke and security pass?"}
    K -->|No| L["Rollback staging"]
    K -->|Yes| M["Manual prod approval"]
    M --> N["Blue/green VPS deploy"]
    N --> O["Post-deploy SLO check"]

    class O,I ok
    class M,J warn
    class F,H,L bad
```

<br/>

**Signed artifact lifecycle — commit to production**

```mermaid
sequenceDiagram
    autonumber
    participant Dev as Developer
    participant GHA as GitHub Actions
    participant SQ as SonarQube
    participant TV as Trivy / Grype
    participant SY as Syft + Cosign
    participant HR as Harbor Registry
    participant VPS as Production VPS
    participant OBS as Grafana / Slack

    Dev->>GHA: Push tagged release
    GHA->>SQ: SAST quality gate
    SQ-->>GHA: Pass / fail
    GHA->>TV: SCA + image vulnerability scan
    TV-->>GHA: CVE report
    GHA->>SY: Generate SBOM + sign artifact
    SY->>HR: Store signed image + provenance
    GHA->>VPS: Deploy to staging
    VPS-->>GHA: Health check OK
    GHA->>Dev: Manual production gate
    Dev->>GHA: Approve release
    GHA->>VPS: Zero-downtime rollout
    VPS->>OBS: DORA metrics + security event
    OBS-->>Dev: Deploy confirmed · MTTR tracked
```

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

