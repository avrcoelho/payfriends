export abstract class LocalStorage {
  protected getData<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  protected saveData(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  protected deleteData(key: string): void {
    localStorage.removeItem(key);
  }
}
