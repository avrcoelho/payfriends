export abstract class LocalStorage {
  protected getData<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }
    try {
      return JSON.parse(String(data)) as T;
    } catch {
      return data as unknown as T;
    }
  }

  protected saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  protected deleteData(key: string): void {
    localStorage.removeItem(key);
  }
}
