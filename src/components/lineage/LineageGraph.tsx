import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

interface LineageGraphProps {
  reportId: string;
}

export function LineageGraph({ reportId }: LineageGraphProps) {
  // Sample lineage data - in real app this would be fetched based on reportId
  const initialNodes: Node[] = useMemo(() => [
    {
      id: 'report-1',
      type: 'default',
      position: { x: 50, y: 50 },
      data: { 
        label: 'Sales Performance Report',
        type: 'report'
      },
      style: {
        background: 'hsl(var(--lineage-report))',
        color: 'white',
        border: '2px solid hsl(var(--lineage-report))',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: '500',
        width: 180,
        height: 60,
      },
    },
    {
      id: 'bde-1',
      type: 'default',
      position: { x: 50, y: 200 },
      data: { 
        label: 'Customer Revenue',
        type: 'bde',
        qualityScore: 92
      },
      style: {
        background: 'hsl(var(--lineage-bde))',
        color: 'white',
        border: '2px solid hsl(var(--lineage-bde))',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: '500',
        width: 150,
        height: 50,
      },
    },
    {
      id: 'bde-2',
      type: 'default',
      position: { x: 250, y: 200 },
      data: { 
        label: 'Customer Demographics',
        type: 'bde',
        qualityScore: 87
      },
      style: {
        background: 'hsl(var(--lineage-bde))',
        color: 'white',
        border: '2px solid hsl(var(--lineage-bde))',
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: '500',
        width: 150,
        height: 50,
      },
    },
    {
      id: 'col-1',
      type: 'default',
      position: { x: 0, y: 350 },
      data: { 
        label: 'sales.total_amount',
        type: 'column',
        table: 'sales_fact'
      },
      style: {
        background: 'hsl(var(--lineage-column))',
        color: 'white',
        border: '2px solid hsl(var(--lineage-column))',
        borderRadius: '8px',
        fontSize: '11px',
        fontWeight: '500',
        width: 140,
        height: 40,
      },
    },
    {
      id: 'col-2',
      type: 'default',
      position: { x: 160, y: 350 },
      data: { 
        label: 'customer.customer_id',
        type: 'column',
        table: 'customer_dim'
      },
      style: {
        background: 'hsl(var(--lineage-column))',
        color: 'white',
        border: '2px solid hsl(var(--lineage-column))',
        borderRadius: '8px',
        fontSize: '11px',
        fontWeight: '500',
        width: 140,
        height: 40,
      },
    },
    {
      id: 'col-3',
      type: 'default',
      position: { x: 320, y: 350 },
      data: { 
        label: 'customer.age_group',
        type: 'column',
        table: 'customer_dim'
      },
      style: {
        background: 'hsl(var(--lineage-column))',
        color: 'white',
        border: '2px solid hsl(var(--lineage-column))',
        borderRadius: '8px',
        fontSize: '11px',
        fontWeight: '500',
        width: 140,
        height: 40,
      },
    },
    {
      id: 'upstream-1',
      type: 'default',
      position: { x: 80, y: 500 },
      data: { 
        label: 'CRM_System.Orders',
        type: 'upstream'
      },
      style: {
        background: 'hsl(var(--lineage-upstream))',
        color: 'white',
        border: '2px solid hsl(var(--lineage-upstream))',
        borderRadius: '8px',
        fontSize: '11px',
        fontWeight: '500',
        width: 130,
        height: 40,
      },
    },
    {
      id: 'upstream-2',
      type: 'default',
      position: { x: 240, y: 500 },
      data: { 
        label: 'ERP_System.Customers',
        type: 'upstream'
      },
      style: {
        background: 'hsl(var(--lineage-upstream))',
        color: 'white',
        border: '2px solid hsl(var(--lineage-upstream))',
        borderRadius: '8px',
        fontSize: '11px',
        fontWeight: '500',
        width: 130,
        height: 40,
      },
    },
  ], []);

  const initialEdges: Edge[] = useMemo(() => [
    {
      id: 'e1-1',
      source: 'report-1',
      target: 'bde-1',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: { stroke: 'hsl(var(--governance-blue))', strokeWidth: 2 },
    },
    {
      id: 'e1-2',
      source: 'report-1',
      target: 'bde-2',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: { stroke: 'hsl(var(--governance-blue))', strokeWidth: 2 },
    },
    {
      id: 'e2-1',
      source: 'bde-1',
      target: 'col-1',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: { stroke: 'hsl(var(--lineage-bde))', strokeWidth: 2 },
    },
    {
      id: 'e2-2',
      source: 'bde-1',
      target: 'col-2',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: { stroke: 'hsl(var(--lineage-bde))', strokeWidth: 2 },
    },
    {
      id: 'e2-3',
      source: 'bde-2',
      target: 'col-3',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: { stroke: 'hsl(var(--lineage-bde))', strokeWidth: 2 },
    },
    {
      id: 'e3-1',
      source: 'col-1',
      target: 'upstream-1',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: { stroke: 'hsl(var(--lineage-column))', strokeWidth: 2 },
    },
    {
      id: 'e3-2',
      source: 'col-2',
      target: 'upstream-2',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: { stroke: 'hsl(var(--lineage-column))', strokeWidth: 2 },
    },
    {
      id: 'e3-3',
      source: 'col-3',
      target: 'upstream-2',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: { stroke: 'hsl(var(--lineage-column))', strokeWidth: 2 },
    },
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="h-[600px] w-full border border-border rounded-lg bg-card">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-right"
        style={{ backgroundColor: 'hsl(var(--card))' }}
      >
        <Controls className="bg-card border border-border" />
        <MiniMap 
          className="bg-card border border-border"
          nodeColor={(node) => {
            switch (node.data?.type) {
              case 'report': return 'hsl(var(--lineage-report))';
              case 'bde': return 'hsl(var(--lineage-bde))';
              case 'column': return 'hsl(var(--lineage-column))';
              case 'upstream': return 'hsl(var(--lineage-upstream))';
              default: return 'hsl(var(--muted))';
            }
          }}
        />
        <Background gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}