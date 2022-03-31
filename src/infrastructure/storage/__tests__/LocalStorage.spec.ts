import { LocalStorage } from '../LocalStorage';

class TestStorage extends LocalStorage {
  get(key: string) {
    return this.getData(key);
  }

  save(key: string, data: string) {
    this.saveData(key, data);
  }

  delete(key: string) {
    this.deleteData(key);
  }
}

let testStorage: TestStorage;

describe('Storage', () => {
  beforeEach(() => {
    testStorage = new TestStorage();
  });

  it('should be able to save data in storage', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    const data = JSON.stringify({ name: 'John Doe' });
    testStorage.save('test', data);

    expect(setItemSpy).toBeCalledWith('test', data);
  });

  it('should be able to get data item in storage', async () => {
    const data = JSON.stringify({ name: 'John Doe' });
    testStorage.save('test', data);

    const itemData = testStorage.get('test');

    expect(itemData).toEqual({ name: 'John Doe' });
  });

  it('should be able to returned null when item not exists', async () => {
    const itemData = testStorage.get('test-2');

    expect(itemData).toBe(null);
  });

  it('should be able to returned string type', async () => {
    testStorage.save('test', 'test');
    const itemData = testStorage.get('test');

    expect(itemData).toBe('test');
  });

  it('should be able to remove data', async () => {
    const localstorageRemoveSpied = jest.spyOn(Storage.prototype, 'removeItem');
    const itemData = testStorage.delete('test-2');

    expect(localstorageRemoveSpied).toBeCalled();
  });
});
