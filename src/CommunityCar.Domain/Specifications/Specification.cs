using System.Linq.Expressions;

using CommunityCar.Domain.Entities.Gamification;
using CommunityCar.Domain.Entities.Identity;
using CommunityCar.Domain.Enums;

namespace CommunityCar.Domain.Specifications;

public interface ISpecification<T>
{
    Expression<Func<T, bool>> Criteria { get; }
    List<Expression<Func<T, object>>> Includes { get; }
    List<string> IncludeStrings { get; }
    Expression<Func<T, object>>? OrderBy { get; }
    Expression<Func<T, object>>? OrderByDescending { get; }
    Expression<Func<T, object>>? GroupBy { get; }
    int Take { get; }
    int Skip { get; }
    bool IsPagingEnabled { get; }
}

public abstract class BaseSpecification<T> : ISpecification<T>
{
    public BaseSpecification() { }

    public BaseSpecification(Expression<Func<T, bool>> criteria)
    {
        Criteria = criteria;
    }

    public Expression<Func<T, bool>> Criteria { get; protected set; } = _ => true;
    public List<Expression<Func<T, object>>> Includes { get; } = new();
    public List<string> IncludeStrings { get; } = new();
    public Expression<Func<T, object>>? OrderBy { get; private set; }
    public Expression<Func<T, object>>? OrderByDescending { get; private set; }
    public Expression<Func<T, object>>? GroupBy { get; private set; }
    public int Take { get; private set; }
    public int Skip { get; private set; }
    public bool IsPagingEnabled { get; private set; }

    protected virtual void AddInclude(Expression<Func<T, object>> includeExpression)
    {
        Includes.Add(includeExpression);
    }

    protected virtual void AddInclude(string includeString)
    {
        IncludeStrings.Add(includeString);
    }

    protected virtual void ApplyPaging(int skip, int take)
    {
        Skip = skip;
        Take = take;
        IsPagingEnabled = true;
    }

    protected virtual void ApplyOrderBy(Expression<Func<T, object>> orderByExpression)
    {
        OrderBy = orderByExpression;
    }

    protected virtual void ApplyOrderByDescending(Expression<Func<T, object>> orderByDescendingExpression)
    {
        OrderByDescending = orderByDescendingExpression;
    }

    protected virtual void ApplyGroupBy(Expression<Func<T, object>> groupByExpression)
    {
        GroupBy = groupByExpression;
    }
}

// User Specifications
public class UserByIdSpecification : BaseSpecification<User>
{
    public UserByIdSpecification(Guid userId)
    {
        Criteria = user => user.Id == userId && !user.IsDeleted;
        AddInclude(u => u.UserPoint);
        AddInclude(u => u.Achievements);
    }
}

public class UsersByRoleSpecification : BaseSpecification<User>
{
    public UsersByRoleSpecification(RoleType role)
    {
        Criteria = user => user.Role == role && !user.IsDeleted;
        ApplyOrderBy(u => u.CreatedAt);
    }
}

public class ActiveUsersSpecification : BaseSpecification<User>
{
    public ActiveUsersSpecification()
    {
        Criteria = user => !user.IsDeleted && user.IsActive;
        ApplyOrderByDescending(u => u.LastActivityAt);
    }
}

public class TopUsersByPointsSpecification : BaseSpecification<User>
{
    public TopUsersByPointsSpecification(int top = 10)
    {
        Criteria = user => !user.IsDeleted;
        ApplyOrderByDescending(u => u.TotalPoints);
        ApplyPaging(0, top);
    }
}

// Achievement Specifications
public class AchievementsByUserSpecification : BaseSpecification<UserAchievement>
{
    public AchievementsByUserSpecification(Guid userId)
    {
        Criteria = achievement => achievement.UserId == userId;
        AddInclude(a => a.Badge);
        ApplyOrderByDescending(a => a.EarnedAt);
    }
}

public class RecentAchievementsSpecification : BaseSpecification<UserAchievement>
{
    public RecentAchievementsSpecification(int days = 7)
    {
        var cutoffDate = DateTime.UtcNow.AddDays(-days);
        Criteria = achievement => achievement.EarnedAt >= cutoffDate;
        AddInclude(a => a.Badge);
        AddInclude(a => a.User);
        ApplyOrderByDescending(a => a.EarnedAt);
    }
}

// Follow Specifications
public class FollowersSpecification : BaseSpecification<UserFollow>
{
    public FollowersSpecification(Guid userId)
    {
        Criteria = follow => follow.FollowingId == userId && follow.Status == Enums.FollowStatus.Accepted;
        AddInclude(f => f.Follower);
        ApplyOrderByDescending(f => f.FollowedAt);
    }
}

public class FollowingSpecification : BaseSpecification<UserFollow>
{
    public FollowingSpecification(Guid userId)
    {
        Criteria = follow => follow.FollowerId == userId && follow.Status == Enums.FollowStatus.Accepted;
        AddInclude(f => f.Following);
        ApplyOrderByDescending(f => f.FollowedAt);
    }
}