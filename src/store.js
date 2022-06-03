import create from 'zustand';

const useStore = create((set) => ({
  productRequests: [],
  showOptions: false,
  showStatusOptions: false,
  currentUser: {},
  filteredRequests: [],
  loading: false,

  addFeedback: (feedback) => {
    set((state) => ({
      filteredRequests: [...state.filteredRequests, feedback],
      productRequests: [...state.productRequests, feedback],
    }));
  },

  getProductData: async () => {
    set({ loading: true });
    const response = await fetch('data.json');
    const { currentUser, productRequests } = await response.json();
    const productRequestsWithComments = productRequests.map(
      (productRequest) => {
        const { comments } = productRequest;

        return {
          ...productRequest,
          upvoted: false,
          comments: comments
            ? comments.map((comment) => ({
                ...comment,
                replies: [],
              }))
            : [],
        };
      }
    );

    set({
      loading: false,
      productRequests: productRequestsWithComments.sort(
        (a, b) => b.upvotes - a.upvotes
      ),
      currentUser: currentUser,
      filteredRequests: productRequestsWithComments.sort(
        (a, b) => b.upvotes - a.upvotes
      ),
    });
  },

  toggleShowOptions: (e) => {
    e.stopPropagation();
    set((state) => ({ statusOptions: false }));
    set((state) => ({ showOptions: !state.showOptions }));
  },
  hideShowOptions: (e) => {
    e.stopPropagation();
    set((state) => ({ showOptions: false }));
  },
  toggleShowStatusOptions: (e) => {
    e.stopPropagation();
    set((state) => ({ showStatusOptions: !state.showStatusOptions }));
  },
  hideShowStatusOptions: (e) => {
    e.stopPropagation();
    set((state) => ({ showStatusOptions: false }));
  },

  sortByMostUpvotes: () =>
    set((state) => {
      const newProductRequests = [...state.productRequests];
      const sorted = newProductRequests.sort((a, b) => b.upvotes - a.upvotes);
      set({ filteredRequests: sorted });
    }),

  sortByLeastUpvotes: () =>
    set((state) => {
      const newProductRequests = [...state.productRequests];
      const sorted = newProductRequests.sort((a, b) => a.upvotes - b.upvotes);
      set({ filteredRequests: sorted });
    }),

  sortByMostComments: () =>
    set((state) => {
      const newProductRequests = [...state.productRequests];
      const sorted = newProductRequests.sort(
        (a, b) => b.comments.length - a.comments.length
      );
      set({ filteredRequests: sorted });
    }),

  sortByLeastComments: () =>
    set((state) => {
      const newProductRequests = [...state.productRequests];
      const sorted = newProductRequests.sort(
        (a, b) => a.comments.length - b.comments.length
      );
      set({ filteredRequests: sorted });
    }),

  increaseUpvotes: (id) =>
    set((state) => {
      const newProductRequests = [...state.productRequests];
      const productRequest = newProductRequests.find((p) => p.id === id);
      productRequest.upvotes += 1;
      set({ filteredRequests: newProductRequests });
    }),

  decreaseUpvotes: (id) =>
    set((state) => {
      const newProductRequests = [...state.productRequests];
      const productRequest = newProductRequests.find((p) => p.id === id);
      productRequest.upvotes -= 1;
      set({ productRequests: newProductRequests });
    }),
  toggleUpvoted: (id) => {
    set((state) => {
      const newProductRequests = [...state.productRequests];
      const productRequest = newProductRequests.find((p) => p.id === id);
      productRequest.upvoted = !productRequest.upvoted;
      set({ filteredRequests: newProductRequests });
    });
  },

  filterByCategory: (category) =>
    set((state) => {
      const newProductRequests = state.productRequests;
      if (category === 'all') {
        set({ filteredRequests: newProductRequests });
        return;
      }
      const filtered = newProductRequests.length
        ? newProductRequests.filter((p) => p.category === category)
        : state.productRequests;
      set({ filteredRequests: filtered, productRequests: newProductRequests });
    }),

  deleteProductRequest: (id) =>
    set((state) => {
      const newProductRequests = [...state.productRequests];
      const filtered = newProductRequests.filter((p) => p.id !== id);
      set({ productRequests: filtered, filteredRequests: filtered });
    }),
  editProductRequest: (id, edittedData) =>
    set((state) => {
      const newProductRequests = [...state.productRequests];
      const filtered = newProductRequests.filter((p) => p.id !== id);
      filtered.push(edittedData);
      set({ productRequests: filtered, filteredRequests: filtered });
    }),
  addComment: (id, comment) =>
    set((state) => {
      const newProductRequests = [...state.productRequests];
      const productRequest = newProductRequests.find((p) => p.id === id);
      productRequest.comments.push(comment);
      set({
        productRequests: newProductRequests,
        filteredRequests: newProductRequests,
      });
    }),
  addReply: (id, commentId, reply) =>
    set((state) => {
      const newProductRequests = [...state.productRequests];
      const productRequest = newProductRequests.find((p) => p.id === id);
      const comment = productRequest.comments.find((c) => c.id === commentId);
      comment.replies?.push(reply);
      set({
        productRequests: newProductRequests,
        filteredRequests: newProductRequests,
      });
    }),
}));

export default useStore;
