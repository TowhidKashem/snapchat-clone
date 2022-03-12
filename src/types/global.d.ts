declare global {
  interface Window {
    JEEFACEFILTERAPI: any;
    Filters: {
      bees: FilterFunction;
      deform: FilterFunction;
      dog: FilterFunction;
      halloween: FilterFunction;
      liberty: FilterFunction;
    };
  }

  type FilterFunction = {
    init: (callback: (errorCode: string) => void) => void;
  };
}

export {};
