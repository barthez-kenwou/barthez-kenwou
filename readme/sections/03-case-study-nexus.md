<!--
  File        : readme/sections/03-case-study-nexus.md
  Section     : Case Study — NEXUS
  Purpose     : Accordion: modular SaaS ERP (in development).
  Maintenance : Edit this file, then run `node scripts/build-readme.mjs` to regenerate README.md.
  Note        : HTML comments are stripped from the published README.md output.
-->

<details name="case-studies">
<summary><h3><b>▸ NEXUS</b> — Modular SaaS ERP · In Development · <b>CLICK TO EXPAND ▾</b></h3></summary>

<br/>

<img src="https://img.shields.io/badge/NEXUS-Modular_SaaS_ERP-FF6B35?style=for-the-badge&amp;logo=turborepo&amp;logoColor=white"/>
<img src="https://img.shields.io/badge/STATUS-In_Development-F59E0B?style=flat-square"/>
<img src="https://img.shields.io/badge/ROLE-Architect_·_Full_Stack_·_DevOps-0F172A?style=flat-square"/>

<br/><br/>

| **Challenge** | **Approach** | **Outcome** |
|:---:|:---|:---|
| Fragmented, expensive tools poorly adapted to local markets | Modular monolith (Turborepo) — pay-per-module SaaS with strict domain boundaries | Restaurants build a custom ERP without vendor lock-in |
| Multi-tenant isolation at scale | Tenant context layer + per-tenant module registry | Secure data isolation across 10+ business modules |
| Local payment realities | Unified payment hub (Mobile Money · Stripe · banking) | Subscription billing aligned with Cameroon & international markets |

<br/>

**System architecture — modular monolith on AWS**

```mermaid
flowchart TB
    classDef accent fill:#FF6B35,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef core fill:#7C3AED,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef data fill:#3B82F6,stroke:#0F172A,color:#fff,stroke-width:2px

    subgraph Clients["Client surfaces"]
        LP["SaaS Landing · SEO"]
        PWA["Restaurant PWA"]
        KDS["Kitchen Display"]
        STF["Staff · Admin portals"]
    end

    subgraph Nexus["NEXUS Core — Modular Monolith"]
        GW["API Gateway"]
        TC["Tenant Context"]
        subgraph Domains["Domain modules"]
            ORD["Orders"]
            INV["Inventory"]
            CRM["CRM"]
            POS["POS"]
            ACC["Accounting"]
        end
        BILL["Billing Engine"]
    end

    subgraph Platform["Data + Platform"]
        PG[("PostgreSQL")]
        RD[("Redis")]
        PAY["Payment Hub"]
    end

    subgraph Ops["AWS · DevOps"]
        CICD["GitHub Actions"]
        OBS["Monitoring · Observability"]
    end

    LP --> GW
    PWA --> GW
    KDS --> GW
    STF --> GW
    GW --> TC
    TC --> Domains
    Domains --> PG
    Domains --> RD
    BILL --> PAY
    CICD --> Nexus
    OBS --> Nexus

    class LP,PWA accent
    class GW,TC,BILL core
    class PG,RD,PAY data
```

<br/>

**Tenant onboarding &amp; module activation**

```mermaid
sequenceDiagram
    autonumber
    participant Owner as Restaurant Owner
    participant SaaS as NEXUS Platform
    participant Pay as Payment Hub
    participant Mod as Module Registry
    participant App as Tenant Workspace

    Owner->>SaaS: Register + pick modules
    SaaS->>Pay: Mobile Money / Stripe / Bank
    Pay-->>SaaS: Subscription confirmed
    SaaS->>Mod: Provision enabled modules
    Mod->>App: Spin up tenant context
    App-->>Owner: PWA ready — orders, stock, CRM live
```

<br/>

![Next.js](https://img.shields.io/badge/Next.js-000?style=flat-square&amp;logo=nextdotjs&amp;logoColor=white)
![Turborepo](https://img.shields.io/badge/Turborepo-EF4444?style=flat-square&amp;logo=turborepo&amp;logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&amp;logo=postgresql&amp;logoColor=white)
![AWS](https://img.shields.io/badge/AWS-FF9900?style=flat-square&amp;logo=amazonaws&amp;logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&amp;logo=docker&amp;logoColor=white)

<br/>

</details>

<img src="https://capsule-render.vercel.app/api?type=soft&amp;color=1E1B4B&amp;height=8&amp;section=footer&amp;text=%20&amp;fontSize=1&amp;fontColor=FFFFFF" width="90%"/>

<br/>

