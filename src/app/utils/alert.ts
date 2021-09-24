abstract class IAlert {
  async create(title: string, message: string, btnText: string, callback: () => void): Promise<void> { return; }
}

export { IAlert };
