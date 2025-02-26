import { FC } from 'react';
import './index.css';
import AppRouter from "./router/AppRouter.tsx";
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';






const App: FC = () => {
    return <AppRouter />;
};

export default App;