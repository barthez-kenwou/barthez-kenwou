<!--
  File        : readme/sections/03-case-study-intelek-odoo.md
  Section     : Case Study — INTELEK Odoo ERP
  Purpose     : Accordion: Odoo ERP on Kubernetes.
  Maintenance : Edit this file, then run `node scripts/build-readme.mjs` to regenerate README.md.
  Note        : HTML comments are stripped from the published README.md output.
-->


<details name="case-studies">
<summary><h3><b>▸ INTELEK Odoo ERP</b> — Cloud Infrastructure · Kubernetes · BTP · Production · <b>CLICK TO EXPAND ▾</b></h3></summary>

<br/>

<img src="https://img.shields.io/badge/INTELEK-Odoo_ERP_BTP-7C3AED?style=for-the-badge&amp;logo=odoo&amp;logoColor=white"/>
<a href="https://barthez-kenwou.dev/projects/7"><img src="https://img.shields.io/badge/CASE_STUDY-barthez--kenwou.dev-FF6B35?style=flat-square&amp;logo=hashnode&amp;logoColor=white" alt="View case study"/></a>
<a href="https://erp-dev.zenora360.com/"><img src="https://img.shields.io/badge/LIVE-erp--dev.zenora360.com-22C55E?style=flat-square&amp;logo=googlechrome&amp;logoColor=white" alt="Live ERP"/></a>
<img src="https://img.shields.io/badge/STATUS-Production-22C55E?style=flat-square"/>
<img src="https://img.shields.io/badge/ROLE-DevOps_Engineer-0F172A?style=flat-square"/>

<br/><br/>

| **Challenge** | **Approach** | **Outcome** |
|:---:|:---|:---|
| BTP company (~15 staff) managing projects, finance &amp; HR across fragmented tools | Full Odoo ERP — 10+ core &amp; OCA modules customized for construction workflows | Single source of truth for all operations |
| No scalable, secure infrastructure for business-critical ERP data | Kubernetes-orchestrated stack on hardened VPS · PostgreSQL persistence · Nginx ingress | Production-ready platform with controlled access |
| Risk of data loss on containerized ERP without reliable backup strategy | Automated external backups to MinIO object storage + restore validation | Business continuity guaranteed · full operational traceability |

<br/>

**Cloud ERP infrastructure — Kubernetes topology**

```mermaid
flowchart TB
    classDef edge fill:#3B82F6,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef k8s fill:#7C3AED,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef data fill:#22C55E,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef ops fill:#FF6B35,stroke:#0F172A,color:#fff,stroke-width:2px

    subgraph Users["INTELEK teams · ~15 users"]
        FIN["Finance"]
        PM["Project managers"]
        HR["HR · procurement"]
        SALES["Sales"]
    end

    subgraph Edge["Edge layer"]
        DNS["DNS · TLS"]
        NGX["Nginx reverse proxy"]
    end

    subgraph K8S["Kubernetes cluster · VPS"]
        ING["Ingress controller"]
        subgraph OdooStack["Odoo workload"]
            WEB["Odoo web pods"]
            WORK["Odoo workers"]
            CRON["Scheduled jobs"]
        end
        subgraph Modules["Business modules"]
            PROJ["Project management"]
            ACCT["Accounting"]
            STOCK["Inventory · purchases"]
            HRMOD["HR · payroll"]
        end
    end

    subgraph Data["Data platform"]
        PG[("PostgreSQL · persistent volume")]
        FILE["Filestore volume"]
        MINIO[("MinIO backups")]
    end

    subgraph Sec["Security and ops"]
        HARD["Server hardening"]
        BK["Backup automation"]
        MON["Health monitoring"]
    end

    Users --> DNS --> NGX --> ING
    ING --> WEB --> WORK
    WEB --> Modules
    WORK --> PG
    WEB --> FILE
    CRON --> PG
    PG --> BK --> MINIO
    HARD --> K8S
    MON --> K8S

    class FIN,PM,HR,SALES edge
    class WEB,WORK,CRON,Modules k8s
    class PG,FILE,MINIO data
    class HARD,BK,MON ops
```

<br/>

**Odoo business modules — construction company workflows**

```mermaid
flowchart LR
    classDef mod fill:#7C3AED,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef flow fill:#FF6B35,stroke:#0F172A,color:#fff,stroke-width:2px

    A["New BTP project"] --> B["Project module"]
    B --> C["Budget and planning"]
    C --> D["Procurement · purchases"]
    D --> E["Inventory · stock"]
    E --> F["Invoicing · accounting"]
    F --> G["HR · timesheets"]
    G --> H["Reporting · dashboards"]
    B --> I["Sales · CRM pipeline"]
    I --> D

    class B,C,D,E,F,G,I mod
    class A,H flow
```

<br/>

**Backup &amp; disaster recovery workflow**

```mermaid
sequenceDiagram
    autonumber
    participant Odoo as Odoo application
    participant PG as PostgreSQL
    participant FS as Filestore volume
    participant Job as Backup cron job
    participant MIN as MinIO object storage
    participant OPS as DevOps operator

    Odoo->>PG: Transactional writes
    Odoo->>FS: Attachments and documents
    Job->>PG: pg_dump snapshot
    Job->>FS: Archive filestore
    Job->>MIN: Upload encrypted backup
    MIN-->>Job: Storage confirmation
    Job->>OPS: Success notification
    alt Restore drill
        OPS->>MIN: Fetch backup artifact
        MIN->>PG: Restore database
        MIN->>FS: Restore files
        PG-->>Odoo: Service validated
    end
```

<br/>

![Odoo](https://img.shields.io/badge/Odoo-714B67?style=flat-square&amp;logo=odoo&amp;logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&amp;logo=kubernetes&amp;logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&amp;logo=postgresql&amp;logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&amp;logo=docker&amp;logoColor=white)
![MinIO](https://img.shields.io/badge/MinIO-C72C48?style=flat-square&amp;logo=minio&amp;logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&amp;logo=nginx&amp;logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&amp;logo=python&amp;logoColor=white)

<br/>

</details>

<br/>

<img src="https://capsule-render.vercel.app/api?type=soft&amp;color=0F172A&amp;height=40&amp;section=header&amp;text=Tech%20Arsenal&amp;fontSize=18&amp;fontColor=FFFFFF" width="100%"/>

