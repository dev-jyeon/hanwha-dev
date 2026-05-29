import { useEffect } from 'react';
import { FileTest } from './src/pages/FileTest';

export default function App() {
  // useEffect(() => {
  //   var url = 'http://' + location.host;
  //   function SetOZParamters_OZViewer() {
  //     // prepare viewer parameters
  //     // get the object from the "OZViewer" <div>
  //     var oz = document.getElementById('OZViewer');
  //     // oz server url(path)
  //     oz.sendToActionScript('connection.servlet', url + '/training/server');
  //     // eform file path (relative to the repository server)
  //     oz.sendToActionScript('connection.reportname', '/forcs/john.kim/customer.ozr');
  //     return true;
  //   }
  //   start_ozjs('OZViewer', url + '/html5viewer/'); // run HTML5 JS viewer
  // }, []);
  // return (
  //   <div>
  //     123
  //     <iframe src="http://opentutorials.org" width="90%" height="300" scrolling="yes"></iframe>
  //   </div>
  // );

  useEffect(() => alert(''), []);
  return (
    <>
      123w
      <FileTest callback={(v) => console.log(v)} />
    </>
  );
}
