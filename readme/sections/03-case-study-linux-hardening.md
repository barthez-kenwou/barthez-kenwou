<!--
  File        : readme/sections/03-case-study-linux-hardening.md
  Section     : Case Study — Linux Hardening
  Purpose     : Accordion: Ubuntu server hardening.
  Maintenance : Edit this file, then run `node scripts/build-readme.mjs` to regenerate README.md.
  Note        : HTML comments are stripped from the published README.md output.
-->


<details name="case-studies">
<summary><h3><b>▸ Linux Server Hardening</b> — Ubuntu Production Security · Multi-Layer Defense · Active · <b>CLICK TO EXPAND ▾</b></h3></summary>

<br/>

<img src="https://img.shields.io/badge/Linux_Hardening-Ubuntu_Production-EF4444?style=for-the-badge&amp;logo=linux&amp;logoColor=white"/>
<a href="https://barthez-kenwou.dev/projects/10"><img src="https://img.shields.io/badge/CASE_STUDY-barthez--kenwou.dev-FF6B35?style=flat-square&amp;logo=hashnode&amp;logoColor=white" alt="View case study"/></a>
<img src="https://img.shields.io/badge/STATUS-Active-22C55E?style=flat-square"/>
<img src="https://img.shields.io/badge/ROLE-DevOps_Engineer-0F172A?style=flat-square"/>

<br/><br/>

| **Challenge** | **Approach** | **Outcome** |
|:---:|:---|:---|
| Internet-exposed VPS vulnerable to brute force, scans &amp; exploits | Defense-in-depth hardening — SSH, kernel, firewall, WAF, IDS layers | Drastically reduced attack surface · 99.9% uptime |
| No proactive blocking of automated intrusion attempts | Fail2Ban + CrowdSec + UFW/iptables/CSF coordinated stack | 100+ attack attempts blocked daily · auto-ban policies |
| Container workloads needed on a hardened host without compromising isolation | Docker secured + sysctl kernel tuning + centralized logging &amp; alerting | Production-ready host for multi-app Docker deployments |

<br/>

**Defense-in-depth architecture — multi-layer security stack**

```mermaid
flowchart TB
    classDef edge fill:#F59E0B,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef net fill:#3B82F6,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef host fill:#22C55E,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef app fill:#7C3AED,stroke:#0F172A,color:#fff,stroke-width:2px
    classDef obs fill:#FF6B35,stroke:#0F172A,color:#fff,stroke-width:2px

    subgraph Edge["Layer 1 — Edge protection"]
        CF["Cloudflare CDN"]
        WAF["Cloudflare WAF"]
        DDoS["DDoS mitigation"]
    end

    subgraph Network["Layer 2 — Network perimeter"]
        UFW["UFW firewall"]
        IPT["iptables rules"]
        CSF["CSF policy engine"]
    end

    subgraph Intrusion["Layer 3 — Intrusion prevention"]
        F2B["Fail2Ban"]
        CRW["CrowdSec"]
        ALERT["Real-time alerts"]
    end

    subgraph Host["Layer 4 — Host hardening"]
        SSH["Hardened SSH · keys only"]
        SYS["sysctl kernel tuning"]
        PERM["Strict file permissions"]
        AUTO["Unattended security updates"]
    end

    subgraph Runtime["Layer 5 — Application runtime"]
        DOCK["Docker · secured daemon"]
        APPS["Production containers"]
        NGINX["Nginx reverse proxy"]
    end

    subgraph Monitor["Layer 6 — Monitoring"]
        LOGS["Centralized logs"]
        REP["Daily security reports"]
        NTP["NTP time sync"]
    end

    CF --> WAF --> DDoS --> UFW
    UFW --> IPT --> CSF
    CSF --> F2B
    CSF --> CRW
    F2B --> ALERT
    CRW --> ALERT
    UFW --> SSH --> SYS --> PERM --> AUTO
    AUTO --> DOCK --> APPS
    NGINX --> APPS
    APPS --> LOGS --> REP
    SYS --> NTP

    class CF,WAF,DDoS edge
    class UFW,IPT,CSF net
    class F2B,CRW,SSH,SYS host
    class DOCK,APPS,NGINX app
    class LOGS,REP,ALERT obs
```

<br/>

**Attack mitigation pipeline — inbound threat to block**

```mermaid
flowchart LR
    classDef bad fill:#EF4444,stroke:#0F172A,color:#fff
    classDef check fill:#F59E0B,stroke:#0F172A,color:#fff
    classDef ok fill:#22C55E,stroke:#0F172A,color:#fff

    A["Inbound request"] --> B{"Cloudflare WAF match?"}
    B -->|Yes| X1["Block at edge"]
    B -->|No| C{"UFW / CSF allow?"}
    C -->|No| X2["Drop packet"]
    C -->|Yes| D{"SSH brute force?"}
    D -->|Yes| E["Fail2Ban ban IP"]
    D -->|No| F{"Scan pattern?"}
    F -->|Yes| G["CrowdSec decision"]
    G --> H["Community blocklist"]
    F -->|No| I["Allow to service"]
    I --> J["Log + monitor"]
    E --> J
    H --> J

    class X1,X2 bad
    class B,C,D,F,G check
    class I,J ok
```

<br/>

**SSH access hardening — authentication flow**

```mermaid
sequenceDiagram
    autonumber
    participant Attacker as External actor
    participant CF as Cloudflare WAF
    participant FW as UFW CSF firewall
    participant F2B as Fail2Ban
    participant SSH as Hardened SSH
    participant SRV as Ubuntu server
    participant AL as Alert system

    Attacker->>CF: Connection attempt
    CF->>CF: WAF rule evaluation
    alt Malicious pattern detected
        CF-->>Attacker: Blocked at edge
        CF->>AL: WAF alert
    else Traffic allowed
        CF->>FW: Forward to origin
        FW->>FW: Port and IP policy check
        alt Access denied
            FW-->>Attacker: Connection refused
            FW->>F2B: Log failed attempt
            F2B->>AL: Ban threshold alert
        else Access permitted
            FW->>SSH: Handshake request
            SSH->>SSH: Key auth only no root login
            SSH-->>Attacker: Deny if invalid credentials
            SSH->>F2B: Increment fail counter
            SSH->>SRV: Grant limited session
            SRV->>AL: Login audit log
        end
    end
```

<br/>

![Ubuntu](https://img.shields.io/badge/Ubuntu-E95420?style=flat-square&amp;logo=ubuntu&amp;logoColor=white)
![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=flat-square&amp;logo=cloudflare&amp;logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&amp;logo=docker&amp;logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat-square&amp;logo=nginx&amp;logoColor=white)
![Fail2Ban](https://img.shields.io/badge/Fail2Ban-EF4444?style=flat-square&amp;logo=security&amp;logoColor=white)
![CrowdSec](https://img.shields.io/badge/CrowdSec-41AF47?style=flat-square&amp;logo=security&amp;logoColor=white)
![iptables](https://img.shields.io/badge/iptables-3B82F6?style=flat-square&amp;logo=linux&amp;logoColor=white)

<br/>

</details>

<img src="https://capsule-render.vercel.app/api?type=soft&amp;color=1E1B4B&amp;height=8&amp;section=footer&amp;text=%20&amp;fontSize=1&amp;fontColor=FFFFFF" width="90%"/>

<br/>

