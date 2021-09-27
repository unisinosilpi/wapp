abstract class ILoader {
  async create(message: string): Promise<void> { return; }
  async dismiss(): Promise<void> { return; }
}

export { ILoader };
