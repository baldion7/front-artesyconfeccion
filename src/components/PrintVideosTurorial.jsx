import YouTube from 'react-youtube';
export const PrintVideosTurorial = ({ response}) => {
  console.log(response)
  return (
      <>
        {response.map((item, index) => (
            <div key={index}>
              <h2>{item.Name}</h2>
              <YouTube key={index} videoId={item.video_route} id="videoPlayer" />

            </div>
        ))}
      </>
  );
};