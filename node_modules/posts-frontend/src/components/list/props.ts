interface dataItems {
  id: number;
  title: string;
  createdAt: string;
}

export default interface ListProps {
  props: {
    data: Array<dataItems>;
  };
}
