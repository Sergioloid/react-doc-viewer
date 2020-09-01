import React, { FC, useContext, useEffect } from "react";
import { Document } from "react-pdf";
import styled from "styled-components";
import { DocViewerContext } from "../../../../state";
import { PDFContext } from "../../state";
import { setNumPages } from "../../state/actions";
import { initialPDFState } from "../../state/reducer";
import { PDFAllPages } from "./PDFAllPages";
import PDFSinglePage from "./PDFSinglePage";

const PDFPages: FC<{}> = () => {
  const {
    state: { currentDocument },
  } = useContext(DocViewerContext);
  const {
    state: { paginated },
    dispatch,
  } = useContext(PDFContext);

  useEffect(() => {
    dispatch(setNumPages(initialPDFState.numPages));
  }, [currentDocument]);

  if (!currentDocument || currentDocument.base64Data === undefined) return null;

  return (
    <DocumentPDF
      file={currentDocument.base64Data}
      onLoadSuccess={({ numPages }) => dispatch(setNumPages(numPages))}
      loading={<span>Loading...</span>}
    >
      {paginated ? <PDFSinglePage /> : <PDFAllPages />}
    </DocumentPDF>
  );
};

const DocumentPDF = styled(Document)`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export default PDFPages;