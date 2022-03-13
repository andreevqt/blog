export default {

  makePage: function (value) {
    return value;
  },


  makePagination: function (currentPage, totalPages, limit) {
    let items = [];

    if (totalPages <= 1) {
      return items;
    }

    if (totalPages <= limit) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(this.makePage(i));
      }
    } else {
      let slidingStart;
      let slidingEnd;

      const numAdjacents = Math.floor((limit - 3) / 2);

      if (currentPage + numAdjacents > totalPages) {
        slidingStart = totalPages - limit + 2;
      } else {
        slidingStart = currentPage - numAdjacents;
      }

      if (slidingStart < 2) {
        slidingStart = 2;
      }

      slidingEnd = slidingStart + limit - 3;
      if (slidingEnd >= totalPages) {
        slidingEnd = totalPages - 1;
      }

      items.push(this.makePage(1));
      if (slidingStart > 2) {
        items.push(`...`);
      }

      for (let i = slidingStart; i <= slidingEnd; i++) {
        items.push(this.makePage(i));
      }
      if (slidingEnd < totalPages - 1) {
        items.push(`...`);
      }

      items.push(this.makePage(totalPages));
    }

    return items;
  }
};
