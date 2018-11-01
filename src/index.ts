import {types} from "mobx-state-tree";

export const BaseItem = types.model({
  id: types.string
});

export const ChildItem = BaseItem.props({
  type: types.string
});

const BaseStore = types.model({
  items: types.array(BaseItem)
})
  .actions(self => ({
    findById(id: string) {
      return self.items.find(item => item.id === id);
    }
  }));

const ChildStore = BaseStore.props({
  items: types.array(ChildItem)
})
  .views((self) => ({
    finByType(type: string) {
      const items: typeof self.items = self.items;
      return items.filter(item => item.type === type);
    }
  }));
