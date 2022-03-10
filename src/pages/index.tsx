import { NextPage } from "next";
import { store, view } from "react-easy-state";
import { NextSeo } from "next-seo";
import { styled } from "twin.macro";
import { DefaultPage } from "~/layouts/DefaultPage";

interface Props {}

const Body = styled.div`
  background: linear-gradient(347deg, rgba(2, 0, 36, 1) 0%, rgba(9, 120, 121, 1) 53%, rgba(0, 212, 255, 1) 100%);
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: 5px;
    color: white;
    background-color: black;
    font-size: 18px;
    font-weight: bold;
    width: 25px;
    height: 25px;
    padding: 20px;
    transition-duration: 0.4s;
    user-select: none;
    cursor: pointer;

    :hover {
      background-color: #0095ff;
    }
  }

  h1 {
    font-size: 60px;
    padding: 50px;
    color: white;
    user-select: none;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 10px;
`;

const Index: NextPage<Props> = () => {
  const count = store({
    num: 0,
  });

  setInterval(() => {
    const hour = new Date().getHours();
    if (hour >= 9 && hour <= 21) {
      count.num++;
    } else {
      count.num--;
    }
  }, 3600000);

  return (
    <Body>
      <NextSeo title="Index" />
      <DefaultPage>
        <Wrapper>
          <button onClick={() => count.num--}>&#8595;</button>
          <h1>{count.num}</h1>
          <button onClick={() => count.num++}>&#8593;</button>
        </Wrapper>
      </DefaultPage>
    </Body>
  );
};

export default view(Index);
