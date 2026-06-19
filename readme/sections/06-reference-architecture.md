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

<!-- mermaid: reference/full-stack-architecture.mmd -->

<br/>

**CI/CD delivery pipeline — commit to production**

<!-- mermaid: reference/cicd-delivery-pipeline.mmd -->

<br/>

**Request lifecycle — user hit to data response**

<!-- mermaid: reference/request-lifecycle.mmd -->

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

