<!--
  File        : readme/sections/06-reference-architecture.md
  Section     : Reference Architecture
  Purpose     : Pillars table + Mermaid architecture diagrams.
  Maintenance : Edit this file, then run `node scripts/build-readme.mjs` to regenerate README.md.
  Note        : HTML comments are stripped from the published README.md output.
-->

<img src="https://capsule-render.vercel.app/api?type=soft&amp;color=3B82F6&amp;height=40&amp;section=header&amp;text=Reference%20Architecture&amp;fontSize=18&amp;fontColor=FFFFFF&amp;animation=twinkling" width="100%"/>

<br/>

| Pillar | What it guarantees |
|:---:|:---|
| **Security** | WAF · TLS · JWT/RBAC · rate limiting · secret management · DevSecOps scans |
| **Performance** | CDN edge cache · Redis + NodeCache · compression · clustering · Lighthouse 95+ |
| **Reliability** | Health checks · zero-downtime deploys · SLO/SLI · automated rollback |
| **Observability** | Prometheus metrics · Loki logs · Grafana dashboards · Alertmanager |

<br/>

**Full-stack reference architecture — layered system design**

```mermaid
flowchart TB
    classDef client fill:#3B82F6,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef edge fill:#22C55E,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef fe fill:#FF6B35,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef be fill:#7C3AED,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef data fill:#4169E1,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef ops fill:#E6522C,stroke:#0F172A,color:#fff,stroke-width:2px

    subgraph L1["01 · CLIENT LAYER"]
        USR["Users"]
        WEB["Web Browsers"]
        MOB["Mobile · React Native"]
        DESK["Desktop · PWA"]
        USR --> WEB
        USR --> MOB
        USR --> DESK
    end

    subgraph L2["02 · EDGE LAYER"]
        CF["Cloudflare CDN"]
        WAF["Cloudflare WAF"]
        DDoS["DDoS Protection"]
        NGX["Nginx Reverse Proxy"]
        TLS["TLS Termination · HTTP/2"]
        CF --> WAF
        WAF --> DDoS
        DDoS --> NGX
        NGX --> TLS
    end

    subgraph L3["03 · FRONTEND APPLICATION"]
        NEXT["React · Next.js"]
        TS["TypeScript"]
        UI["Tailwind · shadcn/ui"]
        SEO["SEO Booster · SSR · Meta"]
        STATE["Zustand · State Mgmt"]
        PWA["PWA · Service Worker"]
        UX["Framer Motion · UX"]
        NEXT --> TS
        NEXT --> UI
        NEXT --> SEO
        NEXT --> STATE
        NEXT --> PWA
        NEXT --> UX
    end

    subgraph L4["04 · BACKEND APPLICATION"]
        NODE["Node.js · Express"]
        API["REST · GraphQL APIs"]
        AUTH["JWT · RBAC · Helmet"]
        RATE["Rate Limit · CORS · Validation"]
        PERF["Performance Layer"]
        CLU["Clustering · Worker Threads"]
        LINT["ESLint · Prettier · Best Practices"]
        C1["Redis Cache · L2"]
        C2["NodeCache · L1"]
        NODE --> API
        NODE --> AUTH
        AUTH --> RATE
        NODE --> PERF
        PERF --> CLU
        PERF --> LINT
        API --> C1
        API --> C2
    end

    subgraph L5["05 · DATA LAYER"]
        ORM["Prisma · Mongoose ORM"]
        PG[("PostgreSQL")]
        MG[("MongoDB")]
        S3["AWS S3 · Object Storage"]
        BKP["Automated Backups"]
        ORM --> PG
        ORM --> MG
        S3 --> BKP
    end

    subgraph L6["06 · DEVOPS · PLATFORM"]
        GHA["GitHub Actions CI/CD"]
        DOCK["Docker · Multi-stage Builds"]
        K8S["Kubernetes · AWS EKS/ECS"]
        TF["Terraform · IaC"]
        PROM["Prometheus Metrics"]
        LOKI["Loki · Centralized Logs"]
        GRAF["Grafana Dashboards"]
        ALT["Alertmanager · PagerDuty"]
        SNYK["Snyk · SBOM · SAST"]
        DEP["Blue/Green · Rolling Deploy"]
        GHA --> DOCK
        DOCK --> K8S
        TF --> K8S
        GHA --> SNYK
        K8S --> DEP
        PROM --> GRAF
        LOKI --> GRAF
        ALT --> GRAF
    end

    L1 --> L2
    L2 --> L3
    L3 -->|HTTPS / API| L4
    L4 --> L5
    L6 -.->|deploy + monitor| L3
    L6 -.->|deploy + monitor| L4
    L6 -.->|deploy + monitor| L5

    class USR,WEB,MOB,DESK client
    class CF,WAF,DDoS,NGX,TLS edge
    class NEXT,TS,UI,SEO,STATE,PWA,UX fe
    class NODE,API,AUTH,RATE,PERF,CLU,LINT,C1,C2 be
    class ORM,PG,MG,S3,BKP data
    class GHA,DOCK,K8S,TF,PROM,LOKI,GRAF,ALT,SNYK,DEP ops
```

<br/>

**CI/CD delivery pipeline — commit to production**

```mermaid
flowchart LR
    classDef step fill:#2088FF,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef gate fill:#22C55E,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef warn fill:#F59E0B,stroke:#0F172A,color:#fff,stroke-width:2px

    PUSH["Git Push / PR"] --> LINT["Lint · Type Check"]
    LINT --> UNIT["Unit · Integration Tests"]
    UNIT --> E2E["Cypress E2E"]
    E2E --> SEC["SAST · SBOM · Snyk"]
    SEC --> BUILD["Docker Build · Scan"]
    BUILD --> STG["Staging Deploy"]
    STG --> SMOKE["Smoke · Load Tests"]
    SMOKE --> PROD["Production Deploy"]
    PROD --> SLO["SLO · Error Rate Check"]
    SLO --> OBS["Metrics · Logs · Alerts"]

    class PUSH,LINT,UNIT,E2E,BUILD step
    class SEC gate
    class STG,SMOKE,PROD,SLO,OBS warn
```

<br/>

**Request lifecycle — user hit to data response**

```mermaid
sequenceDiagram
    autonumber
    participant U as User Device
    participant E as Edge CDN + WAF
    participant F as Next.js Frontend
    participant B as Express API
    participant C as Redis / NodeCache
    participant D as PostgreSQL / MongoDB
    participant O as Observability Stack

    U->>E: HTTPS request
    E->>E: WAF rules · DDoS filter · cache check
    E->>F: Forward (cache miss)
    F->>F: SSR · SEO meta · hydration
    F->>B: API call (JWT attached)
    B->>B: Auth · rate limit · validation
    B->>C: Cache lookup
    alt Cache hit
        C-->>B: Cached payload
    else Cache miss
        B->>D: Query via ORM
        D-->>B: Data result
        B->>C: Write-through cache
    end
    B-->>F: JSON response
    F-->>U: Rendered UI
    B->>O: Trace · metrics · structured logs
```

<br/>

![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&amp;logo=cloudflare&amp;logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&amp;logo=nginx&amp;logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000?style=flat-square&amp;logo=nextdotjs&amp;logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&amp;logo=typescript&amp;logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000?style=flat-square&amp;logo=react&amp;logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&amp;logo=node.js&amp;logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat-square&amp;logo=redis&amp;logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&amp;logo=postgresql&amp;logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&amp;logo=mongodb&amp;logoColor=white)
![AWS S3](https://img.shields.io/badge/AWS_S3-FF9900?style=flat-square&amp;logo=amazons3&amp;logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&amp;logo=docker&amp;logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&amp;logo=kubernetes&amp;logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&amp;logo=githubactions&amp;logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-E6522C?style=flat-square&amp;logo=prometheus&amp;logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-F46800?style=flat-square&amp;logo=grafana&amp;logoColor=white)

<br/>

