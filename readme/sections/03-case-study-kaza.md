<!--
  File        : readme/sections/03-case-study-kaza.md
  Section     : Case Study — Kaza
  Purpose     : Accordion: PropTech + AI fraud detection.
  Maintenance : Edit this file, then run `node scripts/build-readme.mjs` to regenerate README.md.
  Note        : HTML comments are stripped from the published README.md output.
-->

<details name="case-studies">
<summary><h3><b>▸ Kaza</b> — PropTech + AI Fraud Detection · In Development · <b>CLICK TO EXPAND ▾</b></h3></summary>

<br/>

<img src="https://img.shields.io/badge/Kaza-PropTech_+_AI_Fraud-7C3AED?style=for-the-badge&amp;logo=homeassistant&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/STATUS-In_Development-F59E0B?style=flat-square"/>
<img src="https://img.shields.io/badge/ROLE-Full_Stack_·_DevOps-0F172A?style=flat-square"/>

<br/><br/>

| **Challenge** | **Approach** | **Outcome** |
|:---:|:---|:---|
| Rampant listing fraud &amp; zero trust in local PropTech | AI fraud pipeline — image analysis, price anomaly, behavior scoring | ~70% moderation cost reduction target |
| Inefficient tenant–landlord matching | Credit-based listing quality + advanced multi-filter search | Higher signal-to-noise on every published ad |
| Low conversion on traditional portals | Native WhatsApp handoff for direct contact | Frictionless conversion on mobile-first market |

<br/>

**Ecosystem architecture — web, mobile &amp; AI services**

```mermaid
flowchart LR
    classDef accent fill:#7C3AED,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef ai fill:#FF6B35,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef data fill:#3B82F6,stroke:#0F172A,color:#fff,stroke-width:2px

    subgraph Apps["User-facing apps"]
        RN["React Native"]
        WEB["Next.js Web"]
        ADM["Admin Panel"]
    end

    subgraph Gateway["API layer"]
        GQL["GraphQL Gateway"]
        API["REST Services"]
    end

    subgraph Intel["Fraud Intelligence"]
        IMG["Image Authenticity"]
        PRC["Price Benchmark"]
        BEH["Behavior Signals"]
        SCR["Trust Score Engine"]
    end

    subgraph Store["Data platform"]
        PG[("PostgreSQL")]
        RD[("Redis")]
        SRCH["Search Index"]
    end

    subgraph Infra["Cloud · DevOps"]
        K8S["Kubernetes · AWS"]
        MON["Prometheus · Loki · Grafana"]
    end

    RN --> GQL
    WEB --> GQL
    ADM --> API
    GQL --> API
    API --> Intel
    IMG --> SCR
    PRC --> SCR
    BEH --> SCR
    API --> Store
    API --> K8S
    MON --> K8S

    class RN,WEB accent
    class IMG,PRC,BEH,SCR ai
    class PG,RD,SRCH data
```

<br/>

**AI fraud detection pipeline**

```mermaid
flowchart TD
    classDef ok fill:#22C55E,stroke:#0F172A,color:#fff
    classDef warn fill:#F59E0B,stroke:#0F172A,color:#fff
    classDef bad fill:#EF4444,stroke:#0F172A,color:#fff

    A["New listing submitted"] --> B{Sufficient credits?}
    B -->|No| R1["Reject · request top-up"]
    B -->|Yes| C["AI moderation pipeline"]

    C --> D["Image authenticity check"]
    C --> E["Price vs. market benchmark"]
    C --> F["User behavior analysis"]

    D --> G{Aggregate risk score}
    E --> G
    F --> G

    G -->|Low risk| H["Publish listing"]
    H --> I["WhatsApp direct CTA"]
    G -->|Medium| J["Flag for manual review"]
    G -->|High| K["Block · alert ops team"]

    class H,I ok
    class J warn
    class K,R1 bad
```

<br/>

![React Native](https://img.shields.io/badge/React_Native-61DAFB?style=flat-square&amp;logo=react&amp;logoColor=black)
![GraphQL](https://img.shields.io/badge/GraphQL-E10098?style=flat-square&amp;logo=graphql&amp;logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&amp;logo=kubernetes&amp;logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&amp;logo=postgresql&amp;logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&amp;logo=prometheus&amp;logoColor=white)

<br/>

</details>

<img src="https://capsule-render.vercel.app/api?type=soft&amp;color=1E1B4B&amp;height=8&amp;section=footer&amp;text=%20&amp;fontSize=1&amp;fontColor=FFFFFF" width="90%"/>

<br/>

