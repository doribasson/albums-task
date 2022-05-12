import { createContext, useState, useMemo } from "react";
import { albumApi } from "../constants/urls";
import debouce from "lodash.debounce";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [selectValue, setSelectValue] = useState({ label: "album1" });
  const [listOfCards, setListOfCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [savedCard, setIsSavedCard] = useState({});
  const [filteredCards, setFilteredCards] = useState([]);

  const [count, setCount] = useState({
    prev: 0,
    next: 15,
  });

  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(
    filteredCards.slice(count.prev, count.next)
  );

  const getMoreData = () => {
    if (current.length === filteredCards?.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setCurrent(
        current.concat(filteredCards?.slice(count.prev + 15, count.next + 15))
      );
    }, 1000);
    setCount((prevState) => ({
      prev: prevState.prev + 15,
      next: prevState.next + 15,
    }));
  };

  const handleChangeSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleChangeSearch, 500);
  }, []);

  const handleChange = async (selectValue = { label: "album1" }) => {
    const param = selectValue.value || 1;
    setSelectValue(selectValue);
    try {
      const res = await fetch(albumApi + param);
      const data = await res.json();
      setListOfCards(data);
      setCount({ prev: 0, next: 15 });
      setHasMore(true);
      setCurrent(data);
    } catch (error) {
      console.log(error);
    }
  };

  const arrayAlbums = [...Array(100)].map((_, i) => i + 1);

  const options = arrayAlbums.map((item, index) => ({
    value: index + 1,
    label: `album${index + 1}`,
  }));

  const handleModal = (prop, card) => {
    if (prop === true) {
      setIsShowModal(true);
      setIsSavedCard(card);
      document.body.style.overflow = "hidden";
    } else {
      setIsShowModal(false);
      document.body.style.overflow = "visible";
    }
  };

  const filterCardsFunction = () => {
    const newFilterCards = listOfCards.filter((el) =>
      el.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(newFilterCards);
    setCurrent(newFilterCards.slice(count.prev, count.next));
  };

  const provideAll = {
    handleModal,
    handleChange,
    handleChangeSearch,
    getMoreData,
    current,
    setCurrent,
    filteredCards,
    setFilteredCards,
    filterCardsFunction,
    savedCard,
    setIsSavedCard,
    debouncedResults,
    options,
    arrayAlbums,
    isShowModal,
    setIsShowModal,
    searchTerm,
    setSearchTerm,
    listOfCards,
    setListOfCards,
    selectValue,
    setSelectValue,
    hasMore,
    setHasMore,
    count,
    setCount,
  };

  return (
    <HomeContext.Provider value={provideAll}>{children}</HomeContext.Provider>
  );
};
