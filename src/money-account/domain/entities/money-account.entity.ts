export class MoneyAccountEntity {
  constructor(
    public readonly id: string,
    public name: string,
    public amount: number,
    public colorHex: string,
    public readonly userId: string,
  ) {}

  updateName(newName: string) {
    this.name = newName;
  }
}
