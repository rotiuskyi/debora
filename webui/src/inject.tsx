function inject<P1 extends object, P2 extends object>
  (Component: React.ComponentType<P1>, propsToInject: P2) {
  return (props: Omit<P1, keyof P2>) => (<Component {...propsToInject as any} {...props} />);
}

export default inject;
