import Header from './app/Header';
import Routes from './app/Routes';

const App = () => {
  return (
    <>
      <Header />
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Routes />
      </div>
    </>
  );
}

export default App
