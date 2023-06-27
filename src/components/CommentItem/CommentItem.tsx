import React from 'react';
import styles from './CommentItem.module.css';

import Button from 'react-bootstrap/Button';

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
              <Button variant="outline-dark" onClick={() => handleEdit(props)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => handleDelete(props.id)}>
                Delete
              </Button>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className={styles.commentBody}>{props.description}</div>
    </div>
  );
};

export default CommentItem;
