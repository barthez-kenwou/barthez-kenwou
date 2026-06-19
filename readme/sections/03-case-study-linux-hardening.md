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

<!-- mermaid: case-studies/linux-hardening-defense-in-depth.mmd -->

<br/>

**Attack mitigation pipeline — inbound threat to block**

<!-- mermaid: case-studies/linux-hardening-attack-mitigation.mmd -->

<br/>

**SSH access hardening — authentication flow**

<!-- mermaid: case-studies/linux-hardening-ssh-flow.mmd -->

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

