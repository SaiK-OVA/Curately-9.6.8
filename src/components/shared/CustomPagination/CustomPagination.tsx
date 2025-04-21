import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Select } from './../../../shared/modules/MaterialImports/FormElements';

import { MenuItem } from './../../../shared/modules/MaterialImports/Menu';
import { IconButton } from './../../../shared/modules/MaterialImports/Button';
import { useEffect, useState } from './../../../shared/modules/React';

import './CustomPagination.scss';
interface CustomPaginationProps {
  page: number;
  rowsPerPage: number;
  rowCount: number;
  onChangePage: (page: number) => void;
  showCount?: boolean;
  maxTotalCount?: number;
}
const CustomPagination: React.FC<CustomPaginationProps> = ({ page, rowsPerPage, rowCount, onChangePage, showCount = true, maxTotalCount = 0 }) => {

  const [totalPages, setTotalPages] = useState<number>(0);


  const handlePrevPage = () => {
    if (page > 0) onChangePage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) onChangePage(page + 1);
  };
  const handlePageChange = (event: any) => {
    onChangePage(Number(event.target.value) - 1);
  };
  const MenuProps = {
    PaperProps: {
      sx: {
        marginTop: '-60px',
      },
      style: {
        maxHeight: 200,
      }
    }
  }

  const [menuItems, setMenuItems] = useState<number[]>([]);

  useEffect(() => {
    // console.log({ page, rowsPerPage, rowCount, totalPages });
    const initial = Array.from({ length: totalPages }, (_, k) => (k + 1));
    setMenuItems(initial);
  }, [totalPages]);

  useEffect(() => {
    // console.log({ page, rowsPerPage, rowCount, totalPages });
    setTotalPages((Math.ceil(rowCount / rowsPerPage) > (maxTotalCount ? (maxTotalCount / rowsPerPage) : 100)) ? (maxTotalCount ? (maxTotalCount / rowsPerPage) : 100) : Math.ceil(rowCount / rowsPerPage));
  }, [rowCount, rowsPerPage]);


  const numberWithCommas = (value: number) => {
    return value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "";
  }


  return (
    <>
      {
        rowCount ?
          <>
            <span className="custom_pagination">
              <IconButton onClick={handlePrevPage} disabled={page === 0}>
                <ArrowLeftIcon />
              </IconButton>
              <Select
                MenuProps={MenuProps}
                value={page + 1}
                onChange={handlePageChange}
              >
                <MenuItem value="" style={{ display: 'none' }}></MenuItem>
                {
                  menuItems.length ? menuItems.map((item) => (
                    <MenuItem key={item} value={item} className="menu">
                      {item}
                    </MenuItem>
                  ))
                    :
                    <MenuItem value="1" style={{ display: 'none' }}></MenuItem>
                }
                {/* {Array.from({ length: totalPages }, (_, index) => (
          <MenuItem key={index + 1} value={index + 1} className="menu">
            {index + 1}
          </MenuItem>
        ))} */}
              </Select>
              <IconButton onClick={handleNextPage} disabled={page >= totalPages - 1}>
                <ArrowRightIcon />
              </IconButton>
            </span>
            <span className='pagination_number'>{(page * rowsPerPage) + 1} - {(rowCount > ((page + 1) * rowsPerPage)) ? ((page + 1) * rowsPerPage) : rowCount} of {numberWithCommas(rowCount)}</span>
            {/* {
              showCount ?
                :
                null
            } */}
          </>
          :
          null
      }
    </>
  );
};

export default (CustomPagination)
