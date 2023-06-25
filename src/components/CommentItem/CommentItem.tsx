import React from 'react';
import styles from './CommentItem.module.css';

import Button from '@mui/material/Button/Button';

const CommentItem = ({ handleEdit, handleDelete, ...props }: any) => {
  return (
    <div className={styles.commentBox}>
      <div className={styles.commentHeader}>
        <div className={styles.metaData}>
          <div className={styles.name}>{props.userName}</div>
          <div className={styles.date}>{props.postedDate}</div>
        </div>
        <div className={styles.buttons}>
          {props.showActions ? (
            <>
              <Button onClick={() => handleEdit(props)} variant="contained">
                Edit
              </Button>
              <Button onClick={() => handleDelete(props.id)} variant="outlined">
                Delete
              </Button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={styles.commentBody}>{props.description}</div>
      <hr />
    </div>
  );
};

export default CommentItem;
