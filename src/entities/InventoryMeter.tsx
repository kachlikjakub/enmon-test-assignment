export class InventoryMeter {
  id: string;
  accessibility: string;
  backend_gateway_meter_id: string;
  owner: string;
  unit: string;
  createdAt: string;

  constructor({
    id,
    accessibility,
    backend_gateway_meter_id,
    owner,
    unit,
    createdAt,
  }: {
    id: string;
    accessibility: string;
    backend_gateway_meter_id: string;
    owner: string;
    unit: string;
    createdAt: string;
  }) {
    this.id = id;
    this.accessibility = accessibility;
    this.backend_gateway_meter_id = backend_gateway_meter_id;
    this.owner = owner;
    this.unit = unit;
    this.createdAt = createdAt;
  }
}
