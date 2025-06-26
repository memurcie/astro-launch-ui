
import { Button } from "@material-tailwind/react";

interface Props {
  bgImage: string;
  title: string;
  description: string;
  filterColor: string;
  titleColor: string;
  descriptionColor: string;
}

export default function PageHeader({
  bgImage,
  title,
  description,
  filterColor,
  titleColor,
  descriptionColor
}: Props) {

  const filter = "mask " + filterColor;
  const h1Color = "mb-2 " + titleColor;
  const pColor = "text-lead mb-4 " + descriptionColor;

  return (
    <>
      <div className="page-header align-items-center min-vh-50" style={{backgroundImage: `url(${bgImage})`}}>
        <span className={filter}></span>
        <div className="container">
          <div className="row justify-content-center">
            <div className="mx-auto text-center col-lg-8">
              <h1 className={h1Color}>{title}</h1>
              <p className={pColor}>
                {description}
              </p>
              <Button 
                color="gray" 
                variant="outlined"
                className="border-2 border-white bg-transparent text-white hover:bg-white hover:bg-opacity-10 flex items-center px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Explore
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


