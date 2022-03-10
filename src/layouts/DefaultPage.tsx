import React from "react";

interface Props {}

export const DefaultPage: React.FC<Props> = ({ children }) => {
  return (
    <>
      <header />
      <main tw="flex-1">{children}</main>
      <footer />
    </>
  );
};
