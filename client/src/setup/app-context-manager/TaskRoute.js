import { useContext } from "react";
import { CategoryListContext } from "../../common/categoryCard/CategoryListContext";

function TaskRoute() {
  const navigate = useNavigate();
  const { category } = useContext(CategoryListContext)
    
  return (
    <div>
        { category ? <RestaurantDetail category={category}/> : <div>Loading</div>}
    </div>
  );
}

export default TaskRoute;