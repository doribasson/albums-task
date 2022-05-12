import { useEffect, lazy, Suspense, useContext } from "react";
import Card from "../../components/card/Card";
import Header from "../../components/header/Header";
import Input from "../../components/input/Input";
import { useFetch } from "../../hooks/useFetch";
import "./home.scss";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import { HomeContext } from "../../context/HomeContext";
import { photosApi } from "../../constants/urls";

const Modal = lazy(() => import("../../components/modal/Modal"));

function Home() {
  const provideAll = useContext(HomeContext);
  const {
    handleModal,
    handleChange,
    getMoreData,
    current,
    filterCardsFunction,
    savedCard,
    debouncedResults,
    options,
    isShowModal,
    searchTerm,
    listOfCards,
    selectValue,
    hasMore,
  } = provideAll;

  useEffect(() => {
    handleChange();
  }, []);

  useEffect(() => {
    filterCardsFunction();
  }, [listOfCards]);

  useEffect(() => {
    filterCardsFunction();
  }, [searchTerm]);

  const res = useFetch(photosApi, {});
  if (res.error) {
    return <div>error...</div>;
  }
  if (res.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Modal show={isShowModal} handleClose={() => handleModal(false)}>
        <p className="modal_title">{savedCard.title}</p>
        <img src={savedCard.url} width="200px" heigh="200px" alt="img" />
        <div className="modal_bottom">
          <p>AlbumId: {savedCard.albumId}</p>
          <p>{`PhotoId: ${savedCard.id}`}</p>
        </div>
      </Modal>
      <Header
        styles={{ color: "white", fontSize: "2rem" }}
        content={"Photo albums page"}
      />

      <div className="inputs_place">
        <Input
          onChange={debouncedResults}
          placeholder={"Search photo"}
          type={"text"}
        />

        <Select
          className="select-custom-class"
          options={options}
          placeholder="Select..."
          value={selectValue}
          onChange={handleChange}
        />
      </div>

      <div
        style={{
          marginTop: "1rem",
        }}
      >
        <InfiniteScroll
          dataLength={current.length}
          next={getMoreData}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
          endMessage={<h1>you have seen it all</h1>}
        >
          <div className="List">
            {current &&
              current.map((card, index) => (
                <Card
                  width={320}
                  height={270}
                  key={card.id}
                  card={card}
                  handleModal={handleModal}
                />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </Suspense>
  );
}
export default Home;
