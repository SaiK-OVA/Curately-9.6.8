import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import ApiService from '../../../../shared/api/api';
import { showToaster } from '../../../shared/SnackBar/SnackBar';
import { Box } from './../../../../shared/modules/MaterialImports/Box';
import { CircularProgress } from './../../../../shared/modules/MaterialImports/CircularProgress';
import './Templates.scss';
import { useParams } from 'react-router-dom';
// import { CloseIcon } from '../../../../shared/modules/MaterialImports/Dialog';

interface Template {
  templateId: string;
  templateName: string;
  title: string;
  description: string;
  jsonFile: string;
  htmlFile: string;
  createdBy: string;
  type: number;
  isActive: boolean;
  clientId: string;
  subject: string;
  Type: string;
}

const TemplatesStatic = () => {
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  const { templateId } = useParams();

  const fetchTemplate = async () => {
    try {
      const response = await trackPromise(
        ApiService.getById('admin', 'getEmailBuilderTemplatesListById',
          `${templateId}/3`
          // `${templateId}/${userLocalData.getvalue('clientId')}`
        )
      );

      console.log('API Response:', response.data);

      if (response.data.Success && response.data.list && response.data.list.length > 0) {
        setTemplate(response.data.list[0]);
      } else {
        showToaster(response.data.Message || 'No template found', 'error');
      }
    } catch (error) {
      console.error('Error fetching template:', error);
      showToaster('Failed to load template', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplate();
  }, []);

  // const handleClosePreview = () => {
  //   navigate(-1); 
  // };

  if (loading) {
    return <CircularProgress className="centered" />;
  }

  if (!template) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <p>Template not found</p>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <div className="full-page-preview">
        <div className="preview-header">
          {/* <Typography variant="h4" className="preview-title">
            Preview - {template.templateName}
          </Typography> */}
          {/* <Button
            variant="outlined"
            color="secondary"
            onClick={handleClosePreview}
            startIcon={<CloseIcon />}
          >
            Close Preview
          </Button> */}
        </div>
        <div className="preview-content">
          <div className="preview-details">
            {/* <div className="preview-field">
              <span className="preview-label">Subject:</span>
              <span className="preview-value">{template.subject}</span>
            </div> */}
            <div className="preview-field">
              {/* <span className="preview-label">Description:</span> */}
              <div
                className="preview-value email-body"
                dangerouslySetInnerHTML={{
                  __html: (template.Type === "HTML")
                    ? template.description
                    : template.htmlFile
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default TemplatesStatic; 