import styled from "styled-components";
import { ReactComponent as SearchIcon } from "components/Search/images/search.svg";
import { CARD_SIZE, device } from "components/constants";

export const App = {
  Root: styled.div`
    background-color: #fff;
    margin-top: 54px;
    position: relative;
    width: ${CARD_SIZE.width}px;
    max-height: calc(100vh - 54px - 65px);
    overflow: hidden;

    @media ${device.mobile} {
      width: 100%;
      max-height: 100vh;
      margin-top: 0;
    }
  `,
  ScrollContainer: styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 15px 0 12px;
    margin-right: 11px;
    height: 100%;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
      width: 5px;
      height: 5px;
    }

    &::-webkit-scrollbar-button {
      width: 0px;
      height: 0px;
    }

    &::-webkit-scrollbar-thumb {
      background: #4d4d4d;
      border: 0px none #ffffff;
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #4d4d4d;
    }

    &::-webkit-scrollbar-thumb:active {
      background: #4d4d4d;
    }

    &::-webkit-scrollbar-track {
      background: #ffffff;
      border: 0px none #ffffff;
      border-radius: 0px;
    }

    &::-webkit-scrollbar-track:hover {
      background: #ffffff;
    }

    &::-webkit-scrollbar-track:active {
      background: #ffffff;
    }

    &::-webkit-scrollbar-corner {
      background: transparent;
    }
  `,
  ScrollLine: styled.div`
    position: absolute;
    right: 13px;
    top: 25px;
    bottom: 10px;
    width: 1px;
    background-color: rgba(0, 0, 0, 0.16);
  `,
  Message: styled.span`
    display: flex;
    flex-grow: 1;
    justify-content: center;
    align-items: center;
  `,
};

export const Search = {
  Root: styled.div`
    background-color: #fff;
    position: relative;
    display: flex;
    overflow: hidden;
    position: sticky;
    top: 0;
    margin: 0 -10px;
    padding: 20px 10px;
    z-index: 1;
    flex-shrink: 0;

    @media ${device.mobile} {
      position: relative;
    }
  `,
  Input: styled.input`
    font-size: 24px;
    line-height: 48px;
    color: rgba(0, 0, 0, 0.75);
    padding: 0 20px 0 50px;
    border: none;
    outline: none;
    background: #;
    flex-grow: 1;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    border-radius: 2px;
  `,
  Icon: styled(SearchIcon)`
    position: absolute;
    left: 26px;
    top: calc(20px + 12px);
  `,
};

export const ItemsList = {
  Root: styled.div`
    position: relative;
    flex-shrink: 0;
  `,
};

export const Item = {
  Root: styled.div<{ isSelected: boolean }>`
    position: absolute;
    width: 100%;
    height: ${CARD_SIZE.height}px;
    border: 1px solid ${(props) => (props.isSelected ? "#4765ff" : "#fafafa")};
    display: flex;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    border-radius: 3px;
    margin-bottom: ${CARD_SIZE.gap}px;
  `,
  ImgWrapper: styled.div`
    height: ${CARD_SIZE.height}px;
    width: ${CARD_SIZE.height}px;
    background: rgba(0, 0, 0, 0.25);
    flex-shrink: 0;
  `,
  Img: styled.img`
    height: 100%;
    width: 100%;
  `,
  Data: styled.div`
    width: 100%;
    padding: 10px 10px 0 28px;
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media ${device.mobile} {
      padding: 10px 10px 0;
    }
  `,
  Name: styled.span`
    font-size: 24px;
    line-height: 32px;
    color: rgba(0, 0, 0, 0.87);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  Title: styled.span`
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.543846);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  Address: styled.span`
    font-size: 14px;
    line-height: 20px;
    color: rgba(0, 0, 0, 0.543846);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  Splitter: styled.div<{ isSelected: boolean }>`
    width: 100%;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.12);
    opacity: ${(props) => (props.isSelected ? "1" : "0")};
  `,
  Button: styled.button`
    font-weight: bold;
    font-size: 14px;
    line-height: 16px;
    text-align: center;
    color: #009688;
    width: 139px;
    outline: none;
    border: none;
    background: none;
    margin-top: 15px;
    cursor: pointer;

    @media ${device.mobile} {
      margin-top: 10px;
    }
  `,
  Email: styled.span`
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.54);

    @media ${device.mobile} {
      position: static;
    }
  `,
};
