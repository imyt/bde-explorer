# Website Prototype Detailed Specifications (Report-Driven Lineage, Collibra Columns, OpenLineage, DQ)

## 1. Purpose
A governance and lineage prototype where:
- Business Data Elements (BDEs) define business semantics.
- Physical Columns are independent technical assets ingested via Collibra Edge.
- Reports reference BDEs and act as the primary lineage entry point.
- OpenLineage represents technical lineage (one-hop upstream for columns).
- Data Quality (DQ) rules exist at both business (BDE) and technical (Column) levels.

---

## 2. Core Entities

### A. Report
- Primary entry for lineage exploration.

| Attribute | Description | Notes |
|---|---|---|
| Report Name | Unique title | Required |
| Description | Purpose, audience |  |
| Owner | Report owner/steward | Role: ReportOwner |
| Frequency | Run cadence | e.g., Daily |
| Linked BDEs | Semantic dependencies | Many-to-many |
| Tags | Search/governance tags |  |
| Lineage Graph | Computed: Report → BDEs → Columns → Upstream | Read-only |

### B. Business Data Element (BDE)
- Business-level definition of data.

| Attribute | Description | Notes |
|---|---|---|
| BDE Name | Unique name | Required |
| Description | Business meaning and usage |  |
| Sensitivity | PII/Confidential/Public | Compliance |
| Retention Policy | e.g., "2 years" |  |
| Owner | Business steward |  |
| Tags/Categories | Subject areas, domains |  |
| Linked Physical Columns | Technical implementations | Many-to-many |
| Data Quality Controls | Linked DQ rules (business) | See Section 5 |
| DQ Score | Aggregated % | Auto-calculated |
| Last Modified | Timestamp |  |

### C. Physical Column (Collibra-aligned)
- Technical column, independent of reports.

| Attribute | Description | Notes |
|---|---|---|
| Column Name | Database column name |  |
| Qualified Name | system.db.schema.table.column | Unique |
| Data Type | DB type (e.g., VARCHAR) |  |
| Nullable | Allows NULLs | Boolean |
| Length/Precision | Max length/precision | Optional |
| Scale | Decimal scale | Optional |
| Description | Column comment/description | From scan or user |
| Application Name | Source application | From Collibra |
| Schema Name | DB schema |  |
| Table Name | DB table |  |
| Owner | Technical steward/DBA |  |
| Tags/Classification | e.g., Sensitive, PII |  |
| Data Quality Controls | Linked DQ rules (technical) | See Section 5 |
| DQ Score | Technical % score | Auto-updated |
| Lineage Metadata | OpenLineage JSON (one-hop upstream) | Read-only |
| Creation Timestamp | First ingested | From scan |
| Last Modified | Last update |  |

### D. Data Quality Rule (Reusable)
- Can attach to BDEs and/or Columns.

| Attribute | Description |
|---|---|
| Rule Name | Unique name (e.g., "No Null Customer Emails") |
| DQ Dimension | Accuracy, Completeness, Validity, Uniqueness, Consistency, Timeliness |
| Rule Logic | SQL/regex/formula/algorithm |
| Threshold | Pass/fail or tolerance |
| Execution Frequency | Real-time/Daily/Weekly |
| Owner | Accountable person |
| Status | Active/Inactive |
| Last Run Result | Pass/Fail and % compliance |
| Linked Asset Type | BDE and/or Physical Column |

---

## 3. Relationships

- Report ↔ BDE: Many-to-many (reports consume BDEs).
- BDE ↔ Physical Column: Many-to-many (semantic ↔ technical).
- BDE/Column ↔ DQ Rule: Many-to-many (business and technical DQ).

---

## 4. Technical Lineage (OpenLineage)

- Columns store OpenLineage metadata (events/facets).
- Report lineage graph is built by: Report → BDEs → Columns → Column one-hop upstream datasets/columns.

### Example dataset facet (valid JSON)

{
"namespace": "app1.database",
"name": "crm.customers.email",
"facets": {
"columnLineage": {
"fields": [
{
"name": "email",
"mappedFrom": ["source.customer_email"]
}
]
},
"schema": {
"fields": [
{
"name": "email",
"type": "varchar(255)",
"description": "BDE: Customer Email"
}
]
}
}
}

---

## 5. Data Quality (DQ) Controls

### A. On BDE (Business-Level)
- Rules validate semantic correctness (e.g., "Email must be valid format").
- Aggregate BDE DQ Score computed from linked rule outcomes.
- Surfaces in report lineage view at the BDE nodes.

### B. On Physical Column (Technical-Level)
- Rules validate column integrity (nulls, ranges, referential integrity, duplicates).
- Column DQ Score computed from linked rule outcomes.
- Surfaces in lineage view at column nodes.

---

## 6. Functional Modules

### 6.1 Report Repository (Enhanced)
- Search/list reports (name, owner, tags, frequency, last modified, #BDEs).
- Action: View Lineage (primary).
- Quick indicator: Aggregate DQ health for the report (from BDE+column scores).

### 6.2 Lineage Viewer (Report-Centric)
- Inputs: Report ID.
- Views:
  - Business View: Report → BDEs.
  - Technical View: Report → BDEs → Columns → Upstream sources (OpenLineage).
- Features:
  - Interactive graph (zoom/pan, expand/collapse, focus on BDE).
  - Node panels show metadata, DQ scores, owners, lineage timestamps.
  - Filters: by sensitivity, DQ status, application, schema.
  - Export: PNG/SVG/JSON.
  - Color-coded DQ badges (green ≥90%, amber 70–89%, red <70%).

### 6.3 BDE Management
- Create/edit BDEs.
- Link/unlink physical columns.
- Attach business DQ rules.
- View DQ score trends and linked reports.

### 6.4 Physical Column Registry
- Browse/search columns (by app, schema, table, tags).
- Show Collibra-derived metadata.
- Show linked BDEs, lineage JSON (OpenLineage), DQ rules/scores.

### 6.5 DQ Rules Management
- Create reusable rules; assign to BDEs/Columns.
- View execution history, last results, score trends.

### 6.6 Governance & Permissions
- Roles: Admin, Data Steward, Report Owner, Viewer.
- Controls:
  - Report Owners: read lineage for owned reports; propose BDE links.
  - Stewards: CRUD on BDEs, Columns, DQ rules.

### 6.7 Audit & History
- Change logs for BDEs, Columns, Reports, DQ Rules.
- Versioned lineage snapshots for compliance.

---

## 7. Report Owner Lineage Workflow

1. Login → Report Repository.
2. Select report → View Lineage.
3. System resolves:
   - Report’s BDEs → each BDE’s Columns → each Column’s OpenLineage upstream.
4. Render graph; display DQ badges on nodes.
5. Drill into nodes for metadata, DQ details, owners.
6. Export diagram or share link.

---

## 8. Data Model (High-Level)

- Tables/Collections:
  - reports(id, name, description, owner_id, frequency, tags, created_at, updated_at)
  - bdes(id, name, description, sensitivity, retention, owner_id, tags, dq_score, updated_at)
  - columns(id, qualified_name, column_name, data_type, nullable, length, scale, description, application, schema, table, owner_id, tags, dq_score, lineage_json, created_at, updated_at)
  - dq_rules(id, name, dimension, logic, threshold, frequency, owner_id, status, last_result, updated_at)
  - report_bde(report_id, bde_id)
  - bde_column(bde_id, column_id)
  - dq_rule_link(rule_id, asset_type, asset_id)
  - audit_logs(id, entity_type, entity_id, action, actor_id, payload, created_at)

---

## 9. Integration & Refresh

- Collibra Edge scans → populate/update Columns and attributes on schedule.
- OpenLineage events ingested continuously; latest one-hop upstream stored in columns.lineage_json.
- DQ engines execute rules per schedule; scores update BDE/Column aggregates.

---

## 10. Non-Functional Requirements

- Performance: cache lineage graphs for large reports; paginate lists.
- Security: RBAC, audit trails, PII-tag-aware masking in UI.
- Usability: keyboard navigation, accessible color contrast, responsive layout.
- Observability: request tracing, error logging, health checks.
