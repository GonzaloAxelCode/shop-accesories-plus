export interface Inventario {
    productoId: number;
    tiendaId: number;
    cantidad: number;
    stockMinimo: number;
    stockMaximo: number;
    fechaActualizacion: Date;
    activo: boolean;
    lote: string;
    fechaVencimiento?: Date | null;
    costo: number;
    estado: string;
}
