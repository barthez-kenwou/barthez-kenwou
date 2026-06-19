<!--
  File        : readme/sections/03-case-study-gta-it.md
  Section     : Case Study — GTA IT
  Purpose     : Accordion: corporate PWA in production.
  Maintenance : Edit this file, then run `node scripts/build-readme.mjs` to regenerate README.md.
  Note        : HTML comments are stripped from the published README.md output.
-->


<details name="case-studies">
<summary><h3><b>▸ GTA IT</b> — Corporate PWA · CMS · Backoffice · Production · <b>CLICK TO EXPAND ▾</b></h3></summary>

<br/>

<img src="https://img.shields.io/badge/GTA_IT-Corporate_PWA_·_CMS_·_Backoffice-3B82F6?style=for-the-badge&amp;logo=googlechrome&amp;logoColor=white"/>
<a href="https://gta-it.com"><img src="https://img.shields.io/badge/LIVE-gta--it.com-22C55E?style=flat-square&amp;logo=googlechrome&amp;logoColor=white" alt="gta-it.com"/></a>
<img src="https://img.shields.io/badge/STATUS-Production-22C55E?style=flat-square"/>
<img src="https://img.shields.io/badge/ROLE-Full_Stack_Developer-0F172A?style=flat-square"/>

<br/><br/>

| **Challenge** | **Approach** | **Outcome** |
|:---:|:---|:---|
| Weak online presence blocking partner access (Microsoft, PersonVue) | Full PWA corporate platform + custom CMS backoffice | Credibility restored for enterprise partnerships |
| Slow legacy site hurting SEO &amp; recruitment | SSR, dynamic meta tags, Lighthouse 98/100 performance | +150% organic traffic in 3 months |
| Fragmented content &amp; quote workflows | Unified 3-tier architecture with Redis caching layer | Load time under 1.2s · +40% application conversion |

<br/>

**3-tier containerized architecture**

```mermaid
flowchart TB
    classDef accent fill:#3B82F6,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef core fill:#FF6B35,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef ops fill:#7C3AED,stroke:#0F172A,color:#fff,stroke-width:2px

    subgraph PWA["React PWA — gta-it.com"]
        CORP["Corporate pages"]
        BLOG["Blog · Newsletter"]
        PROJ["Project showcase"]
        CAREER["Careers hub"]
        QUOTE["Dynamic quote engine"]
    end

    subgraph API["Node.js · Express API"]
        CMS["CMS controllers"]
        AUTH["Auth · RBAC"]
        CACHE["Redis cache layer"]
    end

    subgraph DB["Persistence"]
        MONGO[("MongoDB · Prisma ORM")]
    end

    subgraph Prod["Production stack"]
        NGX["Nginx reverse proxy"]
        VPS["Hostinger VPS"]
        CICD["GitHub Actions CI/CD"]
    end

    PWA -->|REST API| API
    API --> CACHE
    API --> MONGO
    NGX --> PWA
    NGX --> API
    CICD --> VPS
    VPS --> NGX

    class CORP,BLOG,QUOTE accent
    class CMS,AUTH core
    class NGX,CICD ops
```

<br/>

**Content publishing workflow**

```mermaid
sequenceDiagram
    autonumber
    participant Team as Marketing team
    participant BO as Custom backoffice
    participant API as Express API
    participant Cache as Redis
    participant Site as Public PWA

    Team->>BO: Create or update content
    BO->>API: Authenticated REST request
    API->>API: Validate schema · persist
    API->>Cache: Invalidate stale entries
    Site->>API: SSR fetch + dynamic meta
    API-->>Site: Fresh content
    Site-->>Team: Live on gta-it.com
```

<br/>

![React](https://img.shields.io/badge/React-20232A?style=flat-square&amp;logo=react&amp;logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&amp;logo=node.js&amp;logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat-square&amp;logo=prisma&amp;logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&amp;logo=redis&amp;logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&amp;logo=docker&amp;logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&amp;logo=nginx&amp;logoColor=white)

<br/>

</details>

<img src="https://capsule-render.vercel.app/api?type=soft&amp;color=1E1B4B&amp;height=8&amp;section=footer&amp;text=%20&amp;fontSize=1&amp;fontColor=FFFFFF" width="90%"/>

<br/>

