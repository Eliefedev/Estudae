package com.studytasks.repository;

import com.studytasks.model.Task;
import com.studytasks.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
    List<Task> findByUserAndCategory(User user, Task.Category category);
    List<Task> findByUserAndCompleted(User user, boolean completed);
}
