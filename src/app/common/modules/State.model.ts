export abstract class PagedStateModel<T> {
  items: T[] | null | undefined = [];
  total: number = 0;
  page: number = 1;
  count: number = 10;
  loading: boolean = false;
}
