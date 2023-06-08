function HomePage() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {},
    state: {
      errors: {},
    },
  };
}

export default HomePage;
