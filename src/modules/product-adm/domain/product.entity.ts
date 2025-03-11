import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id;
  name: string;
  purchasePrice: number;
  description: string;
  stock: number;
}

export default class Product extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _purchasePrice: number;
  private _description: string;
  private _stock: number;

  constructor(props: ProductProps) {
    super(props.id);
    this._name = props.name;
    this._purchasePrice = props.purchasePrice;
    this._description = props.description;
    this._stock = props.stock;
  }

  get name(): string {
    return this._name;
  }

  get purchasePrice(): number {
    return this._purchasePrice;
  }

  get description(): string {
    return this._description;
  }

  get stock(): number {
    return this._stock;
  }

  set name(name: string) {
    this._name = name;
  }

  set purchasePrice(purchasePrice: number) {
    this._purchasePrice = purchasePrice;
  }

  set description(description: string) {
    this._description = description;
  }

  set stock(stock: number) {
    this._stock = stock;
  }
}